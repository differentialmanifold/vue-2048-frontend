<template>
    <div class="board"  tabIndex="1">
        <div v-for="(r_item, index1) in board.cells" :key="index1">
            <cell v-for="(c_item, index2) in r_item" :key="index2"></cell>
        </div>
        <tile-view v-for="(tile, index3) in board.tiles" :key="'title' + index3" :tile="tile"/>

        <game-end-overlay :board="board" :onrestart="onRestart"></game-end-overlay>
    </div>
</template>

<script>
import Cell from "./Cell.vue";
import TileView from "./TileView.vue";
import GameEndOverlay from "./GameEndOverlay.vue";
import { Board } from "../board";

var boardInstance = new Board();

export default {
  data() {
    return {
      board: {}
    };
  },
  mounted() {
    var self = this;
    boardInstance.init(response => this.board = response.data);

    window.addEventListener("keydown", this.handleKeyDown.bind(this));

    var options = {isStopPropagation: true, isPreventDefault: true};
    Rhui.mobile.swipeLeft(window, function() {
      self.handleKeyDown({ keyCode: 37 });
    }, options);
    Rhui.mobile.swipeUp(window, function() {
      self.handleKeyDown({ keyCode: 38 });
    }, options);
    Rhui.mobile.swipeRight(window, function() {
      self.handleKeyDown({ keyCode: 39 });
    }, options);
    Rhui.mobile.swipeDown(window, function() {
      self.handleKeyDown({ keyCode: 40 });
    }, options);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
  },
  methods: {
    handleKeyDown(event) {
      var self = this;
      if (this.board.done) {
        return;
      }
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault && event.preventDefault();
        var direction = event.keyCode - 37;
        boardInstance.move(direction).then(response => this.board = response.data);
      }

      //press key p
      if (event.keyCode == 80) {
        this.onRestart();
        var myVar = setInterval(myTime, 3000);
        function myTime() {
          if (!self.board.done) {
            var direction = ~~(Math.random() * 4);
            var result = self.board.step(direction);
            console.log(direction);
            console.log(result);
          } else {
            clearInterval(myVar);
          }
        }
      }
    },
    onRestart() {
      boardInstance.init(response => this.board = response.data);
    }
  },
  components: {
    Cell,
    TileView,
    GameEndOverlay
  }
};
</script>
