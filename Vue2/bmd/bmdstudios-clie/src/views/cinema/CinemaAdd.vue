<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="电影院名称" prop="cinema_name">
                <el-input v-model="form.cinema_name"></el-input>
            </el-form-item>

            <el-form-item label="选择位置">
                <div
                    id="container"
                    style="width: 100%; height: 200px; border: 1px solid black"
                ></div>
            </el-form-item>

            <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item label="省份" prop="province">
                <el-input v-model="form.province"></el-input>
            </el-form-item>

            <el-form-item label="城市" prop="city">
                <el-input v-model="form.city"></el-input>
            </el-form-item>

            <el-form-item label="地区" prop="district">
                <el-input v-model="form.district"></el-input>
            </el-form-item>

            <el-form-item label="经度" prop="longitude">
                <el-input v-model="form.longitude"></el-input>
            </el-form-item>

            <el-form-item label="纬度" prop="latitude">
                <el-input v-model="form.latitude"></el-input>
            </el-form-item>

            <el-form-item label="电影院标签" prop="tags">
                <el-select
                    width="100%"
                    v-model="form.tags"
                    multiple
                    placeholder="请选择电影院"
                >
                    <el-option
                        v-for="item in tags"
                        :key="item.id"
                        :label="item.tagname"
                        :value="item.tagname"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">新增电影院</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
    data() {
        return {
            map: null, // 保存地图对象
            marker: null, // 当前选中的坐标点
            tags: [], // 保存所有的标签
            form: {
                cinema_name: '',
                province: '',
                address: '',
                city: '',
                tags: '',
                latitude: '',
                longitude: '',
                district: '',
            },
            rules: {
                cinema_name: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                longitude: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                province: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                address: [{ required: true, message: '必填', trigger: 'blur' }],
                city: [{ required: true, message: '必填', trigger: 'blur' }],
                tags: [{ required: true, message: '必填', trigger: 'blur' }],
                latitude: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                district: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
            },
        }
    },

    mounted() {
        // 加载电影院的所有标签
        this.$http.cinemaApi.queryAllTags().then((res) => {
            console.log(res)
            this.tags = res.data.data
        })

        // 加载地图
        window._AMapSecurityConfig = {
            securityJsCode: 'b22e9543a7f4fe9b21bdf605df417629',
        }

        AMapLoader.load({
            key: 'e5fc8ab5445cc18255d9d6f4268913c8	', // 申请好的Web端开发者Key，首次调用 load 时必填
            version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then((AMap) => {
                this.map = new AMap.Map('container')
                this.map.setCenter([116.403016, 39.93729])
                this.map.setZoom(13)
                // 为地图绑定事件
                this.map.on('click', (ev) => {
                    let { lng, lat } = ev.lnglat
                    console.log({ lng, lat })
                    // 添加一个点标记
                    if (this.marker) {
                        this.marker.setPosition([lng, lat])
                    } else {
                        this.marker = new AMap.Marker({
                            position: [lng, lat],
                        })
                        this.map.add(this.marker)
                    }
                    // 通过该经纬度,获取对应的详细位置字符串描述
                    // 需要访问高德地图的web服务
                    this.getAddress(AMap, [lng, lat])
                })
            })
            .catch((e) => {
                console.log(e)
            })
    },
    methods: {
        // 通过position经纬度,使用AMap.Geocoder插件
        // 完成逆向地理查询
        getAddress(AMap, position) {
            let geocoder = new AMap.Geocoder()
            geocoder.getAddress(position, (status, result) => {
                console.log(status, result)
                // 回填表单字段
                let r = result.regeocode
                this.form.address = r.formattedAddress
                this.form.province = r.addressComponent.province
                this.form.city = r.addressComponent.city
                this.form.district = r.addressComponent.district
                this.form.longitude = position[0]
                this.form.latitude = position[1]
            })
        },

        // 提交表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.tags = this.form.tags.join(',')
                    console.log(this.form)
                    // 发送add请求,添加影院信息
                    this.$http.cinemaApi.add(this.form).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '新增电影院成功',
                            })
                            this.$router.go(-1)
                        }
                    })
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
