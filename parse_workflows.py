import os
import json
import re
import glob

def parse_workflows():
    workspace_dir = "/Users/venkatkarthik/Desktop/Zovance"
    workflows_dir = os.path.join(workspace_dir, "n8nworkflows.xyz", "workflows")
    output_json_path = os.path.join(workspace_dir, "public", "n8n_workflows_data.json")
    
    if not os.path.isdir(workflows_dir):
        print(f"Error: Workflows directory not found at {workflows_dir}")
        return
        
    print(f"Scanning workflows in: {workflows_dir}")
    subdirs = [d for d in os.listdir(workflows_dir) if os.path.isdir(os.path.join(workflows_dir, d)) and not d.startswith('.')]
    total_dirs = len(subdirs)
    print(f"Found {total_dirs} directories to parse.")
    
    parsed_workflows = []
    
    for idx, d in enumerate(subdirs):
        if idx % 1000 == 0 and idx > 0:
            print(f"Processed {idx}/{total_dirs} directories...")
            
        full_path = os.path.join(workflows_dir, d)
        
        # Check files inside the directory
        try:
            files = os.listdir(full_path)
        except Exception as e:
            print(f"Error reading directory {d}: {e}")
            continue
            
        readme_file = None
        metadata_file = None
        workflow_json = None
        webp_image = None
        
        for f in files:
            if f.startswith("readme-") and f.endswith(".md"):
                readme_file = f
            elif f.startswith("metada-") and f.endswith(".json"):
                metadata_file = f
            elif f.endswith(".json") and not f.startswith("metada-"):
                workflow_json = f
            elif f.endswith(".webp"):
                webp_image = f
                
        # Parse metadata
        meta = {}
        if metadata_file:
            try:
                with open(os.path.join(full_path, metadata_file), "r", encoding="utf-8") as f:
                    meta = json.load(f)
            except Exception as e:
                pass
                
        # Parse description from readme
        overview = ""
        title = d.rsplit("-", 1)[0] if "-" in d else d
        
        if readme_file:
            try:
                with open(os.path.join(full_path, readme_file), "r", encoding="utf-8") as f:
                    readme_content = f.read().replace("\r\n", "\n")
                    
                # Try to extract "Workflow Overview"
                match = re.search(r"### 1. Workflow Overview\s*(.*?)(?=\n### |\n---|# |\Z)", readme_content, re.DOTALL)
                if match:
                    overview = match.group(1).strip()
                else:
                    # Fallback: get first few lines after Title heading
                    lines = readme_content.split("\n")
                    non_empty = [l.strip() for l in lines if l.strip()]
                    paragraphs = []
                    for line in non_empty:
                        if not line.startswith("#") and not line.startswith("http") and not line.startswith("---"):
                            paragraphs.append(line)
                            if len(paragraphs) >= 2:
                                break
                    overview = " ".join(paragraphs)
            except Exception as e:
                pass
                
        # Clean overview text a bit
        # If it starts with "disclaimer", remove it or keep as is. Let's just limit length to 1500 chars to avoid bloated JSON
        if len(overview) > 1500:
            overview = overview[:1497] + "..."
            
        # Compile workflow data
        # Ensure nodes and categories are arrays/objects, never null
        nodes = meta.get("nodeTypes")
        if nodes is None:
            nodes = {}
        elif not isinstance(nodes, dict):
            nodes = {}
        
        categories_raw = meta.get("categories")
        categories = []
        if categories_raw:
            for c in categories_raw:
                if c and isinstance(c, dict) and c.get("name"):
                    categories.append(c.get("name"))
        
        workflow_data = {
            "id": d.rsplit("-", 1)[1] if "-" in d else "",
            "folder_name": d,
            "title": title,
            "author": meta.get("user_name", "Unknown"),
            "url_n8n": meta.get("url_n8n", ""),
            "categories": categories if categories else [],
            "nodes": nodes,
            "summary": overview,
            "readme_file": readme_file,
            "workflow_json": workflow_json,
            "image_file": webp_image
        }
        
        parsed_workflows.append(workflow_data)
        
    print(f"Parsing complete. Total parsed: {len(parsed_workflows)}")
    
    # Save JSON database
    try:
        with open(output_json_path, "w", encoding="utf-8") as f:
            json.dump(parsed_workflows, f, ensure_ascii=False, indent=2)
        print(f"Saved database to: {output_json_path}")
    except Exception as e:
        print(f"Error saving database JSON: {e}")

    # Generate interactive dashboard
    template_path = os.path.join(workspace_dir, "dashboard_template.html")
    dashboard_output_path = os.path.join(workspace_dir, "n8n_workflows_dashboard.html")
    if os.path.isfile(template_path):
        try:
            print("Reading dashboard template...")
            with open(template_path, "r", encoding="utf-8") as f:
                template_content = f.read()
            print("Injecting parsed JSON data into dashboard template...")
            json_str = json.dumps(parsed_workflows, ensure_ascii=False)
            output_content = template_content.replace("/* WORKFLOWS_DATA_PLACEHOLDER */", json_str)
            with open(dashboard_output_path, "w", encoding="utf-8") as f:
                f.write(output_content)
            print(f"Generated standalone dashboard successfully at: {dashboard_output_path}")
        except Exception as e:
            print(f"Error generating dashboard HTML: {e}")
    else:
        print(f"Warning: Dashboard template not found at {template_path}")

if __name__ == "__main__":
    parse_workflows()
