/**
 * ibzie.dev — API client
 */
var IbzApi = (function () {
  'use strict';

  var BASE = '';

  function setBase(url) {
    BASE = url;
  }

  function request(path) {
    return fetch(BASE + path).then(function (res) {
      if (!res.ok) throw new Error('API error ' + res.status);
      return res.json();
    });
  }

  function fetchProjects(offset) {
    offset = offset || 0;
    return request('/api/repos?offset=' + offset + '&limit=6');
  }

  function fetchPapers(offset) {
    offset = offset || 0;
    return request('/api/papers?offset=' + offset + '&limit=6');
  }

  return {
    setBase: setBase,
    fetchProjects: fetchProjects,
    fetchPapers: fetchPapers,
  };
})();
