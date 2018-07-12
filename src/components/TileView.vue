<template>
    <span :class="classes">{{tile.value}}</span>
</template>

<script>

    export default{
        data(){
            return{

            }
        },
        props:{
            tile:{
                type:Object,
                required:true
            }
        },
        computed:{
            classes() {
                var tile = this.tile;
                var classArray = ['tile'];
                classArray.push('tile' + this.tile.value);
                if (!tile.mergedInto) {
                    classArray.push('position_' + tile.row + '_' + tile.column);
                }
                if (tile.mergedInto) {
                    classArray.push('merged');
                }
                if (tile.is_new) {
                    classArray.push('new');
                }
                if (tile.has_moved) {
                    classArray.push('row_from_' + tile.from_row + '_to_' + tile.to_row);
                    classArray.push('column_from_' + tile.from_column + '_to_' + tile.to_column);
                    classArray.push('isMoving');
                }

                return classArray.join(' ');
            }
        },
        components:{

        }
    }
</script>
