$(document).ready(function () {

  conwayGame = {

    spaces: [],
    prevGenLive: [],
    nextGenLive: [],
    gridSize: 0,
    loopCounter: 0,
    interval: '',

    setGrid: function() {
      this.gridSize = $('#grid-size-input').val();
      this.buildGrid();
      $('#grid-builder').remove();
    },

    buildGrid: function() {
      $('#start-game').show();
      for(x = 0; x < Math.pow(this.gridSize, 2); x++) {
        this.spaces.push(x);
        $('#conway-grid').append('<div data-cell="' + x + '" id="cell-' + x + '" class="conway-cell"></div>');
        if(x % this.gridSize == this.gridSize - 1) {
          $('#conway-grid').append('<div class="clear"></div>');
        }
      }
      $('#conway-grid').css('width', this.gridSize * 17);
      this.setLiveCells();
    },

    setLiveCells: function() {
      $('.conway-cell').on('click', function() {
        $(this).toggleClass('live-cell');
      });

      $('#conway-grid').on('mousedown',function() {
        $('.conway-cell').bind('mousedown mouseover', function(){
          if(!($(this).hasClass('live-cell'))) {
            $(this).addClass('live-cell');
          }
        });
      }).on('mouseup', function() {
        $('.conway-cell').unbind('mousedown mouseover');
      });
    },

    startGame: function() {
      $('#reset-game').show();
      this.nextGenLive = [];
      this.gridLoop();
    },

    gridLoop: function() {
      $('.conway-cell').each(function() {
        conwayGame.checkNeighbors($(this));
      });

      this.interval = setInterval(function(){
        conwayGame.nextGenLive = [];
        $('.conway-cell').each(function() {
          conwayGame.checkNeighbors($(this));
        });
        conwayGame.loopCounter += 1;
      }, 100);
    },

    checkNeighbors: function(current) {
      grSz = this.gridSize * 1;
      curCell = current.data('cell');
      rows = [grSz * -1, 0, grSz];
      cols = [-1, 0, 1];
      if(curCell % grSz == 0) { cols.splice(cols.indexOf(-1), 1); } // left edge
      if(curCell % grSz == grSz - 1) { cols.splice(cols.indexOf(1), 1); } // right edge
      if(curCell - grSz < 0) { rows.splice(rows.indexOf(grSz * -1), 1); } // top edge
      if(curCell + grSz >= this.spaces.length) { rows.splice(rows.indexOf(grSz * 1), 1); } // bottom edge
      liveNeighbors = [];
      rows.forEach(function(r) {
        cols.forEach(function(c) {
          if(($('#cell-' + conwayGame.spaces[curCell + (r + c)]).hasClass('live-cell')) && ((curCell + r + c) != curCell)) {
            liveNeighbors.push(curCell + (r + c));
          }
        });
      });
      this.buildNextGen(curCell, liveNeighbors);
    },

    buildNextGen: function(curCell, liveNeighbors) {
      if($('#cell-' + curCell).hasClass('live-cell')) {
        if(liveNeighbors.length == 2 || liveNeighbors.length == 3) { this.nextGenLive.push(curCell); }
      } else {
        if(liveNeighbors.length == 3) { this.nextGenLive.push(curCell); }
      }
      if(curCell == this.spaces.length - 1) { this.lastCellGenerationLoop(); }
    },

    lastCellGenerationLoop: function() {
      this.prevGenLive = [];
      $('.prev-live-cell').each(function(){
        $(this).removeClass('prev-live-cell');
      });

      $('.live-cell').each(function(){
        conwayGame.prevGenLive.push($(this).data('cell'));
        $(this).addClass('prev-live-cell');
        $(this).removeClass('live-cell');
      });
      this.nextGenLive.forEach(function(curCell) {
        $('#cell-' + curCell).addClass('live-cell');
      });
    },

    resetGame: function() {
      clearInterval(this.interval);
      this.prevGenLive = [];
      this.nextGenLive = [];
      $('.conway-cell').each(function(){
        $(this).removeClass('live-cell');
        $(this).removeClass('prev-live-cell');
      });
      this.setLiveCells();
    }
  }

  $('#build-grid').on('click', function() {
    conwayGame.setGrid();
  });

  $('#start-game').on('click', function() {
    conwayGame.startGame();
  })

  $('#reset-game').on('click', function() {
    conwayGame.resetGame();
  })

});


