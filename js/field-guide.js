(() => {
  'use strict';

  const guides = [...document.querySelectorAll('.field-guide')];

  guides.forEach(guide => {
    const search = guide.querySelector('[data-field-search]');
    const topic = guide.querySelector('[data-field-topic]');
    const reset = guide.querySelector('[data-field-reset]');
    const count = guide.querySelector('[data-field-count]');
    const empty = guide.querySelector('[data-field-empty]');
    const cards = [...guide.querySelectorAll('[data-field-note]')];

    if (!search || !topic || !reset || !count || !empty) return;

    const applyFilters = () => {
      const query = search.value.trim().toLocaleLowerCase();
      const selectedTopic = topic.value;
      let visibleCount = 0;

      cards.forEach(card => {
        const matchesQuery = !query || card.textContent.toLocaleLowerCase().includes(query);
        const matchesTopic = selectedTopic === 'all' || card.dataset.topic === selectedTopic;
        const visible = matchesQuery && matchesTopic;

        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      count.textContent = 'Showing ' + visibleCount + ' of ' + cards.length + ' notes';
      empty.hidden = visibleCount !== 0;
    };

    search.addEventListener('input', applyFilters);
    topic.addEventListener('change', applyFilters);

    reset.addEventListener('click', () => {
      search.value = '';
      topic.value = 'all';
      applyFilters();
      search.focus();
    });

    applyFilters();
  });
})();
