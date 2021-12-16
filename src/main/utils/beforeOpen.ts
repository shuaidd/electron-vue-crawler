import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { dbPathChecker } from 'apis/core/datastore/dbChecker'

const configPath = dbPathChecker()
const CONFIG_DIR = path.dirname(configPath)
const { app } = require('electron')

function beforeOpen () {
  if (process.platform === 'darwin') {
    resolveMacWorkFlow()
  }
  resolveClipboardImageGenerator()
  resolveCrawler()
}

function resolveCrawler () {
  let userDataPath = app.getPath('userData')
  console.log('当前运行路径', userDataPath)
  let dest = userDataPath + '/crawler'
  if (fs.existsSync(dest)) {
    return true
  } else {
    try {
      // @ts-ignore
      fs.copySync(path.join(__static, 'crawler'), dest)
    } catch (e) {
      console.log(e)
    }
  }
}

/**
 * macOS 右键菜单
 */
function resolveMacWorkFlow () {
  const dest = `${os.homedir}/Library/Services/Upload pictures with PicGo.workflow`
  if (fs.existsSync(dest)) {
    return true
  } else {
    try {
      fs.copySync(path.join(__static, 'Upload pictures with PicGo.workflow'), dest)
    } catch (e) {
      console.log(e)
    }
  }
}

/**
 * 初始化剪贴板生成图片的脚本
 */
function resolveClipboardImageGenerator () {
  let clipboardFiles = getClipboardFiles()
  if (!fs.pathExistsSync(path.join(CONFIG_DIR, 'windows10.ps1'))) {
    clipboardFiles.forEach(item => {
      fs.copyFileSync(item.origin, item.dest)
    })
  } else {
    clipboardFiles.forEach(item => {
      diffFilesAndUpdate(item.origin, item.dest)
    })
  }

  function diffFilesAndUpdate (filePath1: string, filePath2: string) {
    try {
      let file1 = fs.existsSync(filePath1) && fs.readFileSync(filePath1)
      let file2 = fs.existsSync(filePath1) && fs.readFileSync(filePath2)

      if (!file1 || !file2 || !file1.equals(file2)) {
        fs.copyFileSync(filePath1, filePath2)
      }
    } catch (e) {
      console.error(e)
      fs.copyFileSync(filePath1, filePath2)
    }
  }

  function getClipboardFiles () {
    let files = [
      '/linux.sh',
      '/mac.applescript',
      '/windows.ps1',
      '/windows10.ps1',
      '/wsl.sh'
    ]

    return files.map(item => {
      return {
        origin: path.join(__static, item),
        dest: path.join(CONFIG_DIR, item)
      }
    })
  }
}

export default beforeOpen
