const { app, BrowserWindow, screen, Menu } = require("electron");
const path = require("path");
const openAboutWindow = require("about-window").default;

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        "title": "ビンゴゲーム！",
        "width": screen.getPrimaryDisplay().size.width / 1.8,
        "height": screen.getPrimaryDisplay().size.height / 1.4,
        "icon": "icon.png",
        "backgroundColor": "#121212",
        "autoHideMenuBar": true,
        "webPreferences": {
            //"preload": path.join(__dirname, "preload.js")
        }
    });

    mainWindow.setMenu(Menu.buildFromTemplate([
        {
            label: 'About Kana Voice Tool',
            click: () =>
                openAboutWindow({
                    icon_path: path.join(__dirname, "icon.png"),
                    product_name: "binngo!",
                    bug_report_url: "https://discord.gg/GPs3npB63m",
                    bug_link_text: "バグ報告",
                    copyright: "(c) 2021 Taka005#1203",
                    homepage: "https://discord.gg/GPs3npB63m",
                    description: "ただのビンゴゲームです。たぶん需要はないです",
                    license: "MIT",
                    win_options: {
                        parent: mainWindow,
                        modal: true
                    }
                }),
        }
    ]));
    mainWindow.loadFile("app/index.html");

    //mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
