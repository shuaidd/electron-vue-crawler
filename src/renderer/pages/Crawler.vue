<template>
    <el-container>
        <el-main>
            <el-button @click="start">启动</el-button>
        </el-main>
    </el-container>
</template>

<script>
    const exec = require('child_process').exec
    export default {
        name: "TestScala",
        data() {
            return {
                msg: 'hello'
            }
        },
        methods: {
            start() {
                this.$message.success("点击了");
                let cmdStr1 = 'node localServer.js'
                let cmdPath = '.'
                // 子进程名称
                let workerProcess
                runExec(cmdStr1)
                function runExec (cmdStr) {
                    workerProcess = exec(cmdStr, {cwd: cmdPath})
                    // 打印正常的后台可执行程序输出
                    workerProcess.stdout.on('data', function (data) {
                        console.log('stdout: ' + data)
                    })
                    // 打印错误的后台可执行程序输出
                    workerProcess.stderr.on('data', function (data) {
                        console.log('stderr: ' + data)
                    })
                    // 退出之后的输出
                    workerProcess.on('close', function (code) {
                        console.log('out code：' + code)
                    })
                }
            }
        }
    }
</script>
