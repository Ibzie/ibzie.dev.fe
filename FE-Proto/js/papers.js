/**
 * ibzie.dev — Research page
 * Loads papers from API, renders cards, infinite scroll.
 */
(function () {
  'use strict';

  var grid = document.getElementById('papers-grid');
  var sentinel = document.getElementById('scroll-sentinel');
  if (!grid || !sentinel) return;

  var offset = 0;
  var loading = false;
  var done = false;

  function renderCard(p) {
    var card = document.createElement('article');
    card.className = 'paper-card reveal';

    var statusClass = 'paper-status';
    if (p.status === 'published') statusClass += ' paper-published';

    card.innerHTML =
      '<div class="paper-meta">' +
        '<span class="paper-date">' + p.year + '</span>' +
        '<span class="' + statusClass + '">' + p.status + '</span>' +
      '</div>' +
      '<h3>' + p.title + '</h3>' +
      '<p class="abstract">' + (p['abstract'] || '') + '</p>' +
      '<div class="card-links">' +
        '<a href="#" rel="noopener">Read PDF &#8599;</a>' +
        '<a href="#" rel="noopener">arXiv &#8599;</a>' +
      '</div>';

    return card;
  }

  function appendCards(cards) {
    cards.forEach(function (p, i) {
      var card = renderCard(p);
      card.classList.add('reveal-delay-' + Math.min(i % 4, 4));
      grid.appendChild(card);

      requestAnimationFrame(function () {
        card.classList.add('revealed');
      });
    });
  }

  function loadMore() {
    if (loading || done) return;
    loading = true;

    IbzApi.fetchPapers(offset).then(function (data) {
      var papers = data.papers;
      if (papers && papers.length) {
        appendCards(papers);
        offset += papers.length;
      }
      if (!data.hasMore) {
        done = true;
        sentinel.style.display = 'none';
      }
      loading = false;
    }).catch(function () {
      sentinel.innerHTML = '<p class="load-error">Failed to load. <button class="retry-btn" onclick="location.reload()">Retry</button></p>';
      loading = false;
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  }, { rootMargin: '0px 0px 200px 0px' });

  observer.observe(sentinel);
  loadMore();
})();
