import { invoke } from "@tauri-apps/api/core";
import { TrayIcon } from '@tauri-apps/api/tray';
// import { defaultWindowIcon } from '@tauri-apps/api/app';
import { Menu } from '@tauri-apps/api/menu';

const menu = await Menu.new({
  items: [
    {
      id: 'about',
      text: 'About',
      action: () => {
        console.log("About");
      },
    },
  ],
});
const options = {
  menu,
  // icon: await defaultWindowIcon(),
};

await TrayIcon.new(options);


let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
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
