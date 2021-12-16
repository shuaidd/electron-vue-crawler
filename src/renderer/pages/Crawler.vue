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
                    <el-form-item label="登录地址">
                        <el-input v-model="loginUrl" style="width: 500px" placeholder="请输入OA登录地址"></el-input>
                    </el-form-item>
                    <el-form-item label="任务地址">
                        <el-input v-model="jobUrl" style="width: 500px" placeholder="请输入需要执行的审批的地址"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="loadJob">查询任务信息</el-button>
                        <el-button type="danger" @click="msg = ''">清空消息</el-button>
                    </el-form-item>
                </el-form>
                <div class="job-msg text item" v-if="msg">
                    <div v-html="msg"></div>
                    <h1>状态码 code--{{code}}</h1>
                </div>
                <el-empty v-else description="暂无任务明细"></el-empty>
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="审批意见" name="first">

                    </el-tab-pane>
                    <el-tab-pane label="审批节点" name="second">审批节点</el-tab-pane>
                    <el-tab-pane label="审批进度" name="third">审批进度</el-tab-pane>
                </el-tabs>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
  const exec = require('child_process').exec
  import { remote } from 'electron'

  export default {
    name: 'Crawler',
    data () {
      return {
        msg: '',
        loading: false,
        code: '无',
        jobUrl: '',
        loginUrl: '',
        activeName: 'first'
      }
    },
    methods: {
      async runExec (cmdStr) {
        if (!cmdStr) {
          return
        }
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
      async start () {
        this.$message.success('开始启动爬虫任务')
        let cmdStr1 = `node '${remote.app.getPath('userData')}/crawler/localServer.js'`
        await this.runExec(cmdStr1)
      },
      async loadJob () {
        let jobId = this.getQueryString(this.jobUrl, 'jobId')
        if (!jobId) {
          this.$message.error('任务地址不正确，无法获取任务编号')
          return
        }
        this.$http.get(`${this.loginUrl}/api4otherSys/getCurrentJob.do?jobId=${jobId}`).then(res => {
          console.log(res)
          this.msg += JSON.stringify(res.data) + '<br>'
        })
      },
      getQueryString: function (url, name) {
        if (!url) {
          return null
        }
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = url.split('?')[1].match(reg)
        if (r != null) return unescape(r[2])
        return null
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
