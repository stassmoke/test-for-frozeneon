<template>
    <v-app>
        <v-main>
            <v-container>
                <v-text-field
                        v-model="querySearch"
                        :loading="loading"
                        label="Search"
                        required
                        @input="getRest"
                ></v-text-field>
                <v-data-table
                        class="elevation-1"
                        :headers="tableHeaders"
                        :items="makeTableData"
                        :calculate-widths="true"
                        :loading="loading"
                        :no-data-text="'Empty'"
                        @click:row="getMoreData"
                />
                <v-dialog
                        v-model="modalMoreInfo"
                        v-if="modalMoreInfo"
                        max-width="1024"
                >

                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            {{modalMoreInfoData.metadata.name}}
                        </v-card-title>

                        <v-card-text class="pt-4">
                            {{modalMoreInfoData.metadata.description}}
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-list>
                            <v-list-group
                                    v-for="(value, name) in modalMoreInfoData" :key="name"
                                    v-model="name.active"
                                    no-action
                            >
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="name"></v-list-item-title>
                                    </v-list-item-content>
                                </template>

                                <v-list-item
                                        v-for="(valueChild, name) in value"
                                        :key="name"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="valueChild"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    text
                                    @click="modalMoreInfo = false"
                            >
                                Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

<!--                <ais-instant-search :search-client="searchClient" index-name="demo_ecommerce">-->
<!--                    <ais-search-box />-->
<!--                    <ais-hits>-->
<!--                        <template v-slot:item="{ item }">-->
<!--                            <div>{{ item.name }}</div>-->
<!--                        </template>-->
<!--                    </ais-hits>-->
<!--                </ais-instant-search>-->
<!--                {{makeTableData}}-->
            </v-container>
        </v-main>
        <app-footer/>
    </v-app>
</template>

<script>
    // import algoliasearch from 'algoliasearch/lite';
    import 'instantsearch.css/themes/satellite-min.css';
    import appFooter from '../src/components/app-footer'

    export default {
        name: 'App',

        components: {
            appFooter
        },

        data() {
            return {
                tableHeaders: [
                    {
                        text: 'Name',
                        value: 'name',
                    },
                    {
                        text: 'Author',
                        value: 'author',
                    },
                    {
                        text: 'Description',
                        value: 'desc',
                    },
                    {
                        text: 'Keys',
                        value: 'key',
                    },

                ],
                searchResult: null,
                querySearch: null,
                modalMoreInfo: false,
                modalMoreInfoData: null,
                loading: false

                // searchClient: algoliasearch(
                //     'OFCNCOG2CU',
                //     'f54e21fa3a2a0160595bb058179bfb1e'
                // ),
            }
        },
        computed: {
            makeTableData() {
                if(this.searchResult) {
                    let filtered = []
                    this.searchResult.forEach(item => {
                        filtered.push({
                            name: item.package.name,
                            author: (item.package.author || 'empty').name || 'empty',
                            desc: item.package.description || 'no desc',
                            key: item.package.keywords !== undefined ? item.package.keywords : 'no'
                        })
                    } )
                    return filtered
                }
                return []

            }
        },
        watch: {
            modalMoreInfo(isOpen) {
                if(!isOpen) {
                    this.modalMoreInfoData = null
                }
            }
        },
        methods: {
            async getMoreData(val) {
                try {
                     await this.$axios.get(`https://api.npms.io/v2/package/${val.name}`)
                        .then(res => {
                            this.modalMoreInfoData = res.data.collected
                            this.modalMoreInfo = true
                        })

                } catch (e) {
                    console.error(e)
                }
            },
            async getRest() {
                try {
                    this.loading = true
                    const {data} = await this.$axios.get(`https://api.npms.io/v2/search`, {
                        params: {
                            'q': this.querySearch,
                            'size': 250
                        }
                    })
                    this.searchResult = data.results
                    this.loading = false
                } catch (e) {
                    this.loading = false
                    this.searchResult = null
                    console.error(e)
                }

            }
        },
    };
</script>

<style lang="scss">
    .text-start {
        cursor: pointer;
    }
</style>
