<template>
    <v-app id="inspire">
        <Header title="我的课程"></Header>
        <v-content>
            <v-container>
                <v-card flat>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="myCourses"
                            class="elevation-1"
                            hide-actions
                        >
                            <template v-slot:items="props">
                                <td>{{ props.item.number }}</td>
                                <td>{{ props.item.name}}</td>
                                <td>
                                    <v-chip
                                        label
                                        small
                                        outline
                                        disabled
                                        color="primary"
                                    >{{props.item.college}}</v-chip>
                                </td>
                                <td>
                                    <v-btn
                                        small
                                        flat
                                        color="pink"
                                        icon
                                        @click="quitCourse(props.item)"
                                    >退选</v-btn>
                                </td>
                            </template>
                            <template v-slot:no-data>没有数据,希望您刷新一下试试</template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import axios from "axios";
import Header from "@/components/header";
import Cookies from "js-cookie";

export default {
    components: { Header },

    data() {
        return {
            headers: [
                {
                    text: "课程编号",
                    align: "left",
                    sortable: true,
                    value: "number"
                },
                { text: "课程名称", sortable: true, value: "name" },
                { text: "开课院系", sortable: true, value: "college" },
                { text: "选课操作", sortable: false, value: "action" }
            ],
            myCourses: []
        };
    },
    methods: {
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
                    this.myCourses.splice(this.myCourses.indexOf(course),1)
                });
        }
    },
    created() {
        axios.get("/middle/courses").then(res => {
            let courses = res.data;
            this.myCourses = courses.filter(c => c.isSelected);
        });
    }
};
</script>

