//实际使用
document.onkeydown = function (e) {	//对整个页面文档监听
    var keyNum = window.event ? e.keyCode : e.which;		//获取被按下的键值
    //判断如果用户按下了回车键（keycody=13）
    console.log("按下了 "+ keyNum);

    if (keyNum == 38) {
        // 上
        adbup();
    } else if (keyNum == 40) {
        // 下
        adbdown();
    } else if (keyNum == 37) {
        // 左
        adbleft();
    } else if (keyNum == 39) {
        // 右
        adbright();
    } else if (keyNum == 13) {
        // 确认 enter
        adbenter();
    } else if (keyNum == 9) {
        // tab
    
    } else if (keyNum == 8) {
        // 删除按键
        adbback();
    }
}

var adbPath = __dirname + "/assets/";
process.env.PATH = process.env.PATH + adbPath;
var exec = require('child_process').exec;
var fs = require('fs');
var adbShellClient = null;

var adbFile = adbPath + "/adb";

function executeCmd(cmd) {
    exec(cmd, function (err, stdout, stderr) {
        if (err) {
            console.log('executeCmd error:' + stderr);
        } else {
            /*
            这个stdout的内容就是上面我curl出来的这个东西：
            {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
            */
            // var data = JSON.parse(stdout);
            console.log(stdout);
        }
    });
}


/**
 * 配置 adb 命令
 * 没有完成
 */
function confAdb() {
    exec("adb version", function (err, stdout, stderr) {
        if (err) {
            console.log('adb version error:' + stderr);
        } else {
            executeCmd("pwd");
            console.log(stdout);

            if (stdout.indexOf("Android Debug Bridge") != -1) {
                fs.writeFileSync(__dirname + "/adbt", fs.readFileSync(__dirname + "/assets/adb"));

                var adbt = __dirname + "/adbt ";
                executeCmd("chmod +x " + adbt);
                executeCmd(adbt + "devices");
            }
        }
    });
}

function adbshell() {
    executeCmd("echo $PATH");

    adbShellClient = exec(adbFile + " shell", function (err, stdout, stderr) {
        if (err) {
            console.log('executeCmd error:' + stderr);
        } else {
            console.log(stdout);
        }
    });
}

function exitAdbShell() {
    if (adbShellClient != null) {
        adbShellClient.exit();
    }
}

function adbShellBack() {
    adbShellClient.stdin.write("input keyevent 4\n");
}

function adbup() {
    adbShellClient.stdin.write("input keyevent 19\n");
}

function adbdown() {
    adbShellClient.stdin.write("input keyevent 20\n");
}

function adbleft() {
    adbShellClient.stdin.write("input keyevent 21\n");
}

function adbright() {
    adbShellClient.stdin.write("input keyevent 22\n");
}

function adbenter() {
    adbShellClient.stdin.write("input keyevent 23\n");
}

function adbback() {
    adbShellClient.stdin.write("input keyevent 4\n");
}

function adbnext() {
    adbShellClient.stdin.write("input keyevent 294\n");
}

function adbprev() {
    adbShellClient.stdin.write("input keyevent 295\n");
}

/**
 * 方控的语音按键
 */
function adbvoicekey() {
    adbShellClient.stdin.write("input keyevent 224\n");
}

function adbreboot() {
    executeCmd("adb reboot");
}