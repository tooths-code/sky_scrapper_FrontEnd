window.onload = function() {
  $('#myForm').submit(function(event) {
    event.preventDefault();

    var loader = document.createElement('div');
    loader.classList.add('loader');
    document.body.appendChild(loader);

    setTimeout(function() {
      loader.classList.remove('complete');
      loader.classList.add('loading');
    }, 100)

    var formData = {
      traceId: $('#traceId').val(),
      tcId: $('#tcId').val(),
      tjId: $('#tjId').val(),
      mystId: $('#mystId').val(),
      airlineFilter: $('#filter').val(),
      origin: $('#origin').val(),
      destination: $('#destination').val(),
      date: $('#date').val(),
      deven: $('#environment').val()
    };

    var apiRequests = [];
    if(formData.deven === 'Production'){
      if (formData.traceId) {
        apiRequests.push(
          $.get('https://sky-scrapper-fy0b.onrender.com/run-katran', formData)
            .fail(function() {
              alert('Failed to Scrape TBO API');
              loader.classList.add('complete');
              setTimeout(function() {
                loader.remove();
              }, 500);
            })
        );
      }
  
      if (formData.tcId) {
        apiRequests.push(
          $.get('https://sky-scrapper-fy0b.onrender.com/run-tc', formData)
            .fail(function() {
              alert('Failed to Scrape TravClan API');
              loader.classList.add('complete');
              setTimeout(function() {
                loader.remove();
              }, 500);
            })
        );
      }
  
      if (formData.tjId) {
        apiRequests.push(
          $.get('https://sky-scrapper-fy0b.onrender.com/run-tripjack', formData)
            .fail(function() {
              alert('Failed to Scrape TripJack API');
              loader.classList.add('complete');
              setTimeout(function() {
                loader.remove();
              }, 500);
            })
        );
      }
  
      if (formData.mystId) {
        apiRequests.push(
          $.get('https://sky-scrapper-fy0b.onrender.com/run-mystifly', formData)
            .fail(function() {
              loader.classList.add('complete');
              alert('Failed to Scrape Mystifly API');
              setTimeout(function() {
                loader.remove();
              }, 500);
            })
        );
      }
    }
    else {
      if (formData.traceId) {
        apiRequests.push(
          $.get('http://localhost:3000/run-katran', formData)
            .fail(function() {
              alert('Failed to Scrape TBO API');
              loader.classList.add('complete');
              setTimeout(function() {
                loader.remove();
              }, 500);
            })
        );
      }
  
      if (formData.tcId) {
        apiRequests.push(
          $.get('http://localhost:3000/run-tc', formData)
            .fail(function() {
              alert('Failed to Scrape TravClan API');
              loader.classList.add('complete');
              setTimeout(function() {
                loader.remove();
              }, 500);
            })
        );
      }
  
      if (formData.tjId) {
        apiRequests.push(
          $.get('http://localhost:3000/run-tripjack', formData)
            .fail(function() {
              alert('Failed to Scrape TripJack API');
              loader.classList.add('complete');
              setTimeout(function() {
                loader.remove();
              }, 500);
            })
        );
      }
  
      if (formData.mystId) {
        apiRequests.push(
          $.get('http://localhost:3000/run-mystifly', formData)
            .fail(function() {
              loader.classList.add('complete');
              alert('Failed to Scrape Mystifly API');
              setTimeout(function() {
                loader.remove();
              }, 500);
            })
        );
      }
    }
    

    Promise.all(apiRequests).then(function() {
      loader.classList.remove('loading');
      loader.classList.add('complete');
      setTimeout(function() {
        alert('Successfully Scrapped!!!');
        loader.remove();
      }, 1000);
    });
  });
};
