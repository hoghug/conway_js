jQuery(document).ready(function () {
  spaces = [];
  nextGenLive = [];
  loopCounter = 0;
  startGame = 'go'

  jQuery('#grid-size-input').on('blur', function() {
    gridSize = $(this).val();
    buildGrid(gridSize);
    jQuery('#grid-builder').remove();
  });

  function buildGrid(gridSize) {
    jQuery('#start-game').show();
    for(x = 0; x < Math.pow(gridSize, 2); x++) {
      spaces.push(x);
      jQuery('#conway-grid').append('<div data-cell="' + x + '" id="cell-' + x + '" class="conway-cell"></div>');
      if(x % gridSize == gridSize - 1) {
        jQuery('#conway-grid').append('<div class="clear"></div>');
      }
    }
    jQuery('#conway-grid').after('<input id="hidden-gride-size" type="hidden" value="' + gridSize + '">')

    startLiveCells();
  }

  function startLiveCells() {
    jQuery('.conway-cell').on('click', function() {
      $(this).toggleClass('live-cell');
    })
  }

  jQuery('#start-game').on('click', function() {
    gridLoop();
  });

  function gridLoop() {
    jQuery('.conway-cell').each(function() {
      checkNeighbors($(this));
    });
    if(nextGenLive.length > 1) {
      nextGenLive = [];
      loopCounter += 1;
    } else {
      alert('end of game');
    }
  }

  function checkNeighbors(current) {
    gridSize = parseInt(jQuery('#hidden-gride-size').val());
    curCell = current.data('cell');
    rows = [gridSize * -1, 0, gridSize];
    cols = [-1, 0, 1];

    if(curCell % gridSize == 0) { //left edge
      cols.splice(cols.indexOf(-1), 1);
    } else if(curCell % gridSize ==  gridSize - 1) { //right edge
      cols.splice(cols.indexOf(1), 1);
    }

    liveNeighbors = [];

    rows.forEach(function(r) {
      cols.forEach(function(c) {
        if((jQuery('#cell-' + spaces[curCell + (r + c)]).hasClass('live-cell')) && ((curCell + r + c) != curCell)) {
          liveNeighbors.push(curCell + (r + c));
        }
      });
    });
    buildNextGen(curCell, liveNeighbors);
  }

  function buildNextGen(curCell, liveNeighbors) {

    if(jQuery('#cell-' + curCell).hasClass('live-cell')) {
      if(liveNeighbors.length == 2 || liveNeighbors.length == 3) {
        nextGenLive.push(curCell);
      }
    } else {
      if(liveNeighbors.length == 3) {
        nextGenLive.push(curCell);
      }
    }

    if(curCell == spaces.length - 1) {
      jQuery('.live-cell').each(function(){
        $(this).removeClass('live-cell');
      });
      console.log(nextGenLive);
      nextGenLive.forEach(function(curCell) {
        jQuery('#cell-' + curCell).addClass('live-cell');
      });
    }
  }

});

