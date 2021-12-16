<template>
    <el-container>
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>任务栏</span>
                    <el-button :loading="loading" style="float: right; padding: 3px 0" type="text" @click="start">启动任务
                    </el-button>
                </div>
                <el-form :inline="true">
                    <el-form-item label="任务地址">
                        <el-input v-model="jobUrl" style="width: 500px" placeholder="请输入需要执行的审批的地址"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="loadJob">查询任务信息</el-button>
                        <el-button @click="msg = ''">清空消息</el-button>
                    </el-form-item>
                </el-form>
                <div class="job-msg text item" v-if="msg">
                    <div v-html="msg"></div>
                    <h1>状态码 code--{{code}}</h1>
                </div>
                <el-empty v-else description="暂无任务明细"></el-empty>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    const exec = require('child_process').exec
    export default {
        name: 'Crawler',
        data () {
            return {
                msg: '',
                loading: false,
                code: '无',
                jobUrl: ''
            }
        },
        methods: {
            runExec (cmdStr) {
              console.log(`正在执行命令---${cmdStr}`)
                this.loading = true
                let $this = this
                let cmdPath = '.'
                let workerProcess = exec(cmdStr, { cwd: cmdPath })
                // 打印正常的后台可执行程序输出
                workerProcess.stdout.on('data', function (data) {
                    console.log('stdout: ' + data)
                    $this.msg += data + '<br>'
                })
                // 打印错误的后台可执行程序输出
                workerProcess.stderr.on('data', function (data) {
                    console.log('stderr: ' + data)
                    $this.msg += data + '<br>'
                })
                // 退出之后的输出
                workerProcess.on('close', function (code) {
                    $this.loading = false
                    console.log('out code：' + code)
                    $this.code = code
                })
            },
            start () {

                this.$message.success('开始启动爬虫任务')
                let cmdStr1 = `node ${__static}/localServer.js`
                this.runExec(cmdStr1)
            },
            loadJob () {
                this.$http.get('http://kfmy.shinyway.org:8084/api4otherSys/getCurrentJob.do?jobId=1020220').then(res => {
                    console.log(res);
                    this.msg += JSON.stringify(res.data) + '<br>'
                })
            }
        }
    }
</script>
<style scoped>
    .job-msg {
        max-height: 500px;
        overflow-y: scroll;
    }
</style>
