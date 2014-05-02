$(document).ready(function () {
  spaces = [];
  prevGenLive = [];
  nextGenLive = [];
  loopCounter = 0;
  interval = '';

  $('#build-grid').on('click', function() {
    gridSize = $('#grid-size-input').val();
    buildGrid(gridSize);
    $('#grid-builder').remove();
  });

  function buildGrid(gridSize) {
    $('#start-game').show();
    for(x = 0; x < Math.pow(gridSize, 2); x++) {
      spaces.push(x);
      $('#conway-grid').append('<div data-cell="' + x + '" id="cell-' + x + '" class="conway-cell"></div>');
      if(x % gridSize == gridSize - 1) {
        $('#conway-grid').append('<div class="clear"></div>');
      }
    }
    $('#conway-grid').css('width', gridSize * 17);
    $('#conway-grid').after('<input id="hidden-gride-size" type="hidden" value="' + gridSize + '">');

    startLiveCells();
  }

  function startLiveCells() {
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
  }

  $('#start-game').on('click', function() {
    $('#reset-game').show();
    gridLoop();
  });

  function gridLoop() {
    $('.conway-cell').each(function() {
      checkNeighbors($(this));
    });

    interval = setInterval(function(){
      nextGenLive = [];
      $('.conway-cell').each(function() {
        checkNeighbors($(this));
      });
      loopCounter += 1;
    }, 100);
  }

  function checkNeighbors(current) {
    gridSize = parseInt($('#hidden-gride-size').val());
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
        if(($('#cell-' + spaces[curCell + (r + c)]).hasClass('live-cell')) && ((curCell + r + c) != curCell)) {
          liveNeighbors.push(curCell + (r + c));
        }
      });
    });
    buildNextGen(curCell, liveNeighbors);
  }

  function buildNextGen(curCell, liveNeighbors) {

    if($('#cell-' + curCell).hasClass('live-cell')) {
      if(liveNeighbors.length == 2 || liveNeighbors.length == 3) {
        nextGenLive.push(curCell);
      }
    } else {
      if(liveNeighbors.length == 3) {
        nextGenLive.push(curCell);
      }
    }

    if(curCell == spaces.length - 1) { // when you reached the last cell, end of a generation loop
      prevGenLive = [];
      $('.prev-live-cell').each(function(){
        $(this).removeClass('prev-live-cell');
      });

      $('.live-cell').each(function(){
        prevGenLive.push($(this).data('cell'));
        $(this).addClass('prev-live-cell');
        $(this).removeClass('live-cell');
      });
      nextGenLive.forEach(function(curCell) {
        $('#cell-' + curCell).addClass('live-cell');
      });
    }
  }

  $('#reset-game').on('click', function() {
    clearInterval(interval);
    prevGenLive = [];
    nextGenLive = [];
    $('.conway-cell').each(function(){
      $(this).removeClass('live-cell');
      $(this).removeClass('prev-live-cell');
    });
    startLiveCells();
  })

});


