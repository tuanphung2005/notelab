// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::Serialize;
use std::fs;
use std::path::PathBuf;

#[derive(Serialize)]
struct FileInfo {
    name: String,
    path: String,
}

fn get_vault_path() -> Result<PathBuf, String> {
    let home_dir = dirs::document_dir()
        .ok_or("could not find /Documents directory")?;
    
    let vault_path = home_dir.join("notelab_vault");
    
    // create vault
    if !vault_path.exists() {
        fs::create_dir_all(&vault_path)
            .map_err(|e| format!("failed to create vault directory: {}", e))?;
    }
    
    Ok(vault_path)
}

#[tauri::command]
fn get_vault_info() -> Result<String, String> {
    let vault_path = get_vault_path()?;
    Ok(vault_path.to_string_lossy().to_string())
}

#[tauri::command]
fn list_vault_files() -> Result<Vec<FileInfo>, String> {
    let vault_path = get_vault_path()?;
    
    let mut files = Vec::new();
    
    if let Ok(entries) = fs::read_dir(&vault_path) {
        for entry in entries {
            if let Ok(entry) = entry {
                let path = entry.path();
                if path.is_file() {
                    if let Some(extension) = path.extension() {
                        if extension == "md" {
                            if let Some(name) = path.file_name() {
                                let name = name.to_string_lossy().to_string();
                                let full_path = path.to_string_lossy().to_string();
                                files.push(FileInfo { name, path: full_path });
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
fn create_new_note(filename: String) -> Result<String, String> {
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            get_vault_info,
            list_vault_files,
            create_new_note,
            read_note,
            save_note,
            delete_note
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
