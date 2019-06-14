<template>
    <v-toolbar dark color="primary" app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <div>
                    <v-text-field flat solo-inverted clearable prepend-inner-icon="search" label="搜索课程"></v-text-field>
        </div>-->
        <v-menu offset-y origin="center center" :nudge-bottom="10" transition="slide-y-transition">
            <v-btn flat icon large slot="activator">
                <v-avatar size="40px">
                    <img src="../assets/avatar.png" alt="Vuetify">
                </v-avatar>
                <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list class="pa-0">
                <template v-for="(item,index) in menu">
                    <v-divider :key="index" v-if="item.title=='divider'" light></v-divider>
                    <v-list-tile
                        v-else
                        @click="item.click"
                        ripple="ripple"
                        :disabled="item.disabled"
                        rel="noopener"
                        :key="index"
                    >
                        <v-list-tile-action v-if="item.icon">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>
<script>
import Cookies from "js-cookie";
export default {
    props: ["title"],
    data() {
        let vue = this;
        return {
            menu: [
                {
                    icon: "house",
                    title: Cookies.get("college"),
                    click: () => {}
                },
                {
                    icon: "star",
                    title: Cookies.get("number"),
                    click: () => {}
                },
                {
                    icon: "person",
                    title: Cookies.get("name"),
                    click: () => {}
                },
                {
                    title: "divider",
                    click: () => {}
                },
                {
                    icon: "playlist_add",
                    title: "选课界面",
                    click: () => {
                        vue.$router.push("/course");
                    }
                },
                {
                    icon: "playlist_add_check",
                    title: "我的课程",
                    click: () => {
                        vue.$router.push("/myCourse");
                    }
                },
                {
                    icon: "transit_enterexit",
                    title: "登出系统",
                    click: () => {
                        vue.$router.push("/");
                    }
                }
            ]
        };
    }
};
</script>

