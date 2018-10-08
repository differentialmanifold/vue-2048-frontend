<template>
    <div class="overlay" v-show="show">
        <span class="message">{{contents}}</span>
        <button class="tryAgain" @click="restart" >Try again</button>
    </div>
</template>

<script>

    export default{
        data(){
            return{

            }
        },
        props:{
            board:{
                type:Object,
                required:true
            },
            onrestart:{
                type:Function,
                required:true
            }
        },
        computed:{
            show(){
                return this.board.done;
            },
            contents(){
                if(this.board.won){
                    return 'Good Job!'
                }else if(this.board.hasLost){
                    return 'Game Over'
                }else {
                    return ''
                }
            }
        },

        methods:{
            restart(){
                this.onrestart && this.onrestart()
            }
        },
        components:{

        }
    }
</script>
