/**
 * ibzie.dev — GitHub API client
 */
var IbzApi = (function () {
  'use strict';

  var GH_USER = 'Ibzie';
  var GH_REPOS = 'https://api.github.com/users/' + GH_USER + '/repos?sort=updated&per_page=100&type=owner';

  var _cache = null;

  function getStatusFromTopics(topics) {
    if (!topics) return 'unpublished';
    if (topics.indexOf('paper-published') !== -1) return 'published';
    if (topics.indexOf('paper-submitted') !== -1) return 'submitted';
    return 'unpublished';
  }

  function mapRepo(r) {
    var topics = r.topics || [];
    var isPaper = topics.indexOf('paper') !== -1;
    var isFeatured = topics.indexOf('featured') !== -1;

    var item = {
      name: r.name,
      desc: r.description || '',
      lang: r.language || '',
      url: r.html_url,
      homepage: r.homepage || null,
      featured: isFeatured,
      topics: topics,
    };

    if (isPaper) {
      item.type = 'paper';
      item.year = (r.created_at || '').slice(0, 4);
      item.status = getStatusFromTopics(topics);
    } else {
      item.type = 'project';
    }

    return item;
  }

  function fetchAll() {
    if (_cache) return Promise.resolve(_cache);

    return fetch(GH_REPOS)
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API error ' + res.status);
        return res.json();
      })
      .then(function (repos) {
        var projects = [];
        var papers = [];

        repos.forEach(function (r) {
          if (r.fork) return;
          var item = mapRepo(r);
          if (item.type === 'paper') {
            papers.push(item);
          } else {
            projects.push(item);
          }
        });

        projects.sort(function (a, b) {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });

        _cache = { projects: projects, papers: papers };
        return _cache;
      });
  }

  function fetchProjects() {
    return fetchAll().then(function (data) {
      return { projects: data.projects, hasMore: false };
    });
  }

  function fetchPapers() {
    return fetchAll().then(function (data) {
      return { papers: data.papers, hasMore: false };
    });
  }

  return {
    fetchProjects: fetchProjects,
    fetchPapers: fetchPapers,
  };
})();
