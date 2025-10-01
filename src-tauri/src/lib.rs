// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::Serialize;
use std::fs;
use std::path::PathBuf;

#[derive(Serialize)]
struct FileInfo {
    name: String,
    path: String,
}

fn get_vault_root() -> Result<PathBuf, String> {
    let docs = dirs::document_dir()
        .ok_or("could not find /Documents directory")?;
    
    let root = docs.join("notelab_vault");
    
    // create vault root directory
    if !root.exists() {
        fs::create_dir_all(&root)
            .map_err(|e| format!("failed to create vault root directory: {}", e))?;
    }
    
    Ok(root)
}

fn get_notes_path() -> Result<PathBuf, String> {
    let root = get_vault_root()?;
    let notes = root.join("notes");
    
    // create notes directory
    if !notes.exists() {
        fs::create_dir_all(&notes)
            .map_err(|e| format!("failed to create notes directory: {}", e))?;
    }
    
    Ok(notes)
}

// config directory - currently unused but available for future expansion
#[allow(dead_code)]
fn get_config_path() -> Result<PathBuf, String> {
    let vault_root = get_vault_root()?;
    let config_path = vault_root.join("config");
    
    // create config directory
    if !config_path.exists() {
        fs::create_dir_all(&config_path)
            .map_err(|e| format!("failed to create config directory: {}", e))?;
    }
    
    Ok(config_path)
}

fn get_vault_path() -> Result<PathBuf, String> {
    get_notes_path()
}

#[tauri::command]
fn get_vault_info() -> Result<String, String> {
    let notes = get_notes_path()?;
    Ok(notes.to_string_lossy().to_string())
}

#[tauri::command]
fn get_root() -> Result<String, String> {
    let root = get_vault_root()?;
    Ok(root.to_string_lossy().to_string())
}

#[tauri::command]
fn list_vault_files() -> Result<Vec<FileInfo>, String> {
    let notes = get_vault_path()?;
    
    let mut files = Vec::new();
    
    if let Ok(entries) = fs::read_dir(&notes) {
        for entry in entries {
            if let Ok(entry) = entry {
                let path = entry.path();
                if path.is_file() {
                    if let Some(ext) = path.extension() {
                        if ext == "md" {
                            if let Some(name) = path.file_name() {
                                let name = name.to_string_lossy().to_string();
                                let path = path.to_string_lossy().to_string();
                                files.push(FileInfo { name, path });
                            }
                        }
                    }
                }
            }
        }
    }
    
    Ok(files)
}

#[tauri::command]
fn create_note(filename: String) -> Result<String, String> {
    let vault_path = get_vault_path()?;
    let file_path = vault_path.join(&filename);
    
    // oninit
    let content = format!("# {}\n\nstart writing your note here...", 
        filename.strip_suffix(".md").unwrap_or(&filename));
    
    fs::write(&file_path, content)
        .map_err(|e| format!("failed to create: {}", e))?;
    
    Ok(file_path.to_string_lossy().to_string())
}

#[tauri::command]
fn read_note(filename: String) -> Result<String, String> {
    let vault_path = get_vault_path()?;
    let file_path = vault_path.join(&filename);
    
    if !file_path.exists() {
        return Err(format!("file does not exist: {}", filename));
    }
    
    let content = fs::read_to_string(&file_path)
        .map_err(|e| format!("failed to read file: {}", e))?;
    
    Ok(content)
}

#[tauri::command]
fn save_note(filename: String, content: String) -> Result<(), String> {
    let vault_path = get_vault_path()?;
    let file_path = vault_path.join(&filename);
    
    fs::write(&file_path, content)
        .map_err(|e| format!("failed to save file: {}", e))?;
    
    Ok(())
}

#[tauri::command]
fn rename_note(old_filename: String, new_filename: String) -> Result<(), String> {
    let vault_path = get_vault_path()?;
    let old_path = vault_path.join(&old_filename);
    let new_path = vault_path.join(&new_filename);
    
    if !old_path.exists() {
        return Err(format!("file does not exist: {}", old_filename));
    }
    
    if new_path.exists() {
        return Err(format!("file with name '{}' already exists", new_filename));
    }
    
    fs::rename(&old_path, &new_path)
        .map_err(|e| format!("failed to rename file: {}", e))?;
    
    Ok(())
}

#[tauri::command]
fn delete_note(filename: String) -> Result<(), String> {
    let vault_path = get_vault_path()?;
    let file_path = vault_path.join(&filename);
    
    if !file_path.exists() {
        return Err(format!("file does not exist: {}", filename));
    }
    
    fs::remove_file(&file_path)
        .map_err(|e| format!("failed to delete file: {}", e))?;
    
    Ok(())
}

// config commands
#[tauri::command]
fn read_config() -> Result<String, String> {
    let vault_root = get_vault_root()?;
    let config_file = vault_root.join("config.cfg");
    
    if !config_file.exists() {
        let default_config = r#"{
  "theme": "system",
  "font": {
    "fontFamily": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    "fontSize": 16,
    "lineHeight": 1.6
  }
}"#;
        return Ok(default_config.to_string());
    }
    
    fs::read_to_string(&config_file)
        .map_err(|e| format!("failed to read config file: {}", e))
}

#[tauri::command]
fn save_config(config: String) -> Result<(), String> {
    let vault_root = get_vault_root()?;
    let config_file = vault_root.join("config.cfg");
    
    fs::write(&config_file, &config)
        .map_err(|e| format!("failed to write config file: {}", e))?;
    
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            get_vault_info,
            get_root,
            list_vault_files,
            create_note,
            read_note,
            save_note,
            rename_note,
            delete_note,
            read_config,
            save_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
