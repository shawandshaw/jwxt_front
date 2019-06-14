<template>
    <div id="app">
        <v-app id="inspire">
            <Header title="选课界面"></Header>
            <v-content>
                <v-container>
                    <v-tabs v-model="active" fixed-tabs>
                        <v-tab
                            v-for="college in colleges"
                            :key="college"
                            ripple
                            class="title"
                        >{{college}}</v-tab>
                        <v-tab-item v-for="college in colleges" :key="college">
                            <v-card flat>
                                <v-card-text>
                                    <v-data-table
                                        :headers="headers"
                                        :items="courses[college]"
                                        class="elevation-1"
                                        hide-actions
                                    >
                                        <template v-slot:items="props">
                                            <td>{{ props.item.number }}</td>
                                            <td>{{ props.item.name}}</td>
                                            <td>
                                                <span v-if="props.item.isSelected">已选</span>
                                                <span v-else>未选</span>
                                            </td>
                                            <td>
                                                <v-btn
                                                    small
                                                    color="primary"
                                                    v-if="!props.item.isSelected"
                                                    flat
                                                    icon
                                                    @click="chooseCourse(props.item)"
                                                >选课</v-btn>
                                                <v-btn
                                                    small
                                                    flat
                                                    color="pink"
                                                    v-else
                                                    icon
                                                    @click="quitCourse(props.item)"
                                                >退选</v-btn>
                                            </td>
                                        </template>
                                        <template v-slot:no-data>没有数据,希望您刷新一下试试</template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import Header from "@/components/header";
import Cookies from "js-cookie";

export default {
    components: { Header },
    data() {
        let vue = this;
        return {
            // dialog: false,
            colleges: ["建筑学院", "软件学院", "历史学院", "公选课程"],

            headers: [
                {
                    text: "课程编号",
                    align: "left",
                    sortable: true,
                    value: "number"
                },
                { text: "课程名称", sortable: true, value: "name" },
                { text: "状态", sortable: true, value: "isSelected" },
                { text: "选课操作", sortable: false, value: "action" }
            ],
            courses: {
                软件学院: [],
                历史学院: [],
                建筑学院: [],
                公选课程: []
            },

            active: null
        };
    },
    methods: {
        fetchCourse() {
            axios.get("/middle/courses").then(res => {
                let courses = res.data;
                for (const c of courses) {
                    this.courses[c.college].push(c);
                }
            });
        },
        chooseCourse(course) {
            axios
                .post("/middle/select", {
                    student: {
                        number: Cookies.get("number"),
                        name: Cookies.get("name"),
                        college: Cookies.get("college")
                    },
                    course: course
                })
                .then(res => {
                    course.isSelected = true;
                });

        },
        quitCourse(course) {
            axios
                .post("/middle/quit", {
                    student: {
                        number: Cookies.get("number"),
                        name: Cookies.get("name"),
                        college: Cookies.get("college")
                    },
                    course: course
                })
                .then(res => {
                    course.isSelected = false;
                });
        }
    },
    created() {
        axios.get("/middle/name",{
            params:{number:Cookies.get('number')}
        }).then(res=>{
            Cookies.set('name',res.data.name)
        })
        this.fetchCourse();
    },
    props: {
        source: String
    }
};
</script>
