/**
 * ibzie.dev — Research page
 * Loads papers (GitHub repos with "paper" topic), renders cards.
 */
(function () {
  'use strict';

  var grid = document.getElementById('papers-grid');
  var sentinel = document.getElementById('scroll-sentinel');
  if (!grid || !sentinel) return;

  var loaded = false;

  function renderCard(p) {
    var card = document.createElement('article');
    card.className = 'paper-card reveal';

    var statusClass = 'paper-status';
    if (p.status === 'published') statusClass += ' paper-published';

    var linksHtml = '<a href="' + p.url + '" target="_blank" rel="noopener">Repo &#8599;</a>';
    if (p.homepage) {
      linksHtml += '<a href="' + p.homepage + '" target="_blank" rel="noopener">PDF &#8599;</a>';
    }

    card.innerHTML =
      '<div class="paper-meta">' +
        '<span class="paper-date">' + p.year + '</span>' +
        '<span class="' + statusClass + '">' + p.status + '</span>' +
      '</div>' +
      '<h3>' + p.name + '</h3>' +
      '<p class="abstract">' + p.desc + '</p>' +
      '<div class="card-links">' + linksHtml + '</div>';

    return card;
  }

  function load() {
    if (loaded) return;
    loaded = true;
    sentinel.innerHTML = '';

    IbzApi.fetchPapers().then(function (data) {
      var papers = data.papers;
      if (!papers || !papers.length) {
        grid.innerHTML = '<p class="load-error">No papers found.</p>';
        return;
      }

      papers.forEach(function (p, i) {
        var card = renderCard(p);
        card.classList.add('reveal-delay-' + Math.min(i % 4, 4));
        grid.appendChild(card);

        requestAnimationFrame(function () {
          card.classList.add('revealed');
        });
      });

      sentinel.style.display = 'none';
    }).catch(function () {
      sentinel.innerHTML = '<p class="load-error">Failed to load papers. <button class="retry-btn" onclick="location.reload()">Retry</button></p>';
    });
  }

  load();
})();
