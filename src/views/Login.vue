<template>
    <v-app id="login">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-layout justify-center>
                                <v-toolbar-title>欢迎使用集成教务系统</v-toolbar-title>
                            </v-layout>
                        </v-toolbar>

                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    v-model="username"
                                    prepend-icon="person"
                                    name="username"
                                    label="用户名"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    @keyup.enter="submit"
                                    prepend-icon="lock"
                                    name="password"
                                    label="密码"
                                    id="password"
                                    type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary " block class="white--text" @click="submit">登录</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import Cookies from "js-cookie";
import axios from 'axios'
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        submit: function() {
            axios
                .post("/middle/login", {
                    number: this.username,
                    password: this.password
                })
                .then(res => {
                    if (res.data.result === true) {
                        this.$router.push('/course')
                        Cookies.set('number', this.username)
                        Cookies.set('college', res.data.college)
                } else {
                        alert('登录失败');
                    }
                });
        }
    }
};
</script>

<style>
</style>
