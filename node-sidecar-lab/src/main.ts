import { invoke } from "@tauri-apps/api/core";
import { Command } from '@tauri-apps/plugin-shell';


let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // greetMsgEl.textContent = await invoke("greet", {
    //   name: greetInputEl.value,
    // });

    try {
      console.log('Starting sidecar command...');
      const args = ['ping', greetInputEl.value];
      console.log('Command args:', args);
      const command = Command.sidecar('binaries/app', args);
      console.log('Command created, executing...');
      const result = await command.execute();
      console.log('Command result:', result);
      
      if (result.stdout) {
        greetMsgEl.textContent = result.stdout;
      } else if (result.stderr) {
        console.error('Command error:', result.stderr);
        greetMsgEl.textContent = `Error: ${result.stderr}`;
      } else {
        greetMsgEl.textContent = 'No output from command';
      }
    } catch (error: any) {
      console.error('Command execution failed:', error);
      greetMsgEl.textContent = `Error: ${error?.message || 'Unknown error'}`;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");

  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
