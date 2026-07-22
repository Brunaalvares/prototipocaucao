document.querySelectorAll('.nav-item').forEach(item=>{
    const btn = item.querySelector('button');
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });
  document.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('open'));
  });

  const tenantCard = document.querySelector('[data-tenant-card]');
  const tenantContinue = document.querySelector('[data-tenant-continue]');
  const tenantForm = document.querySelector('[data-tenant-form]');
  const tenantLink = document.querySelector('[data-tenant-link]');
  const tenantCopyButton = document.querySelector('[data-copy-tenant-link]');
  const tenantSteps = document.querySelectorAll('[data-tenant-step]');

  function setTenantStep(step){
    tenantSteps.forEach(item=>{
      item.classList.toggle('active', Number(item.dataset.tenantStep) <= step);
    });
  }

  if(tenantLink){
    const path = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
    tenantLink.value = `${window.location.origin}${path}`;
  }

  if(tenantContinue){
    tenantContinue.addEventListener('click', ()=>{
      if(tenantCard) tenantCard.classList.add('form-ready');
      setTenantStep(2);
      const nameField = document.querySelector('#tenant-name');
      if(nameField) nameField.focus();
    });
  }

  if(tenantForm){
    tenantForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      if(tenantCard) tenantCard.classList.add('sent');
      setTenantStep(3);
    });
  }

  if(tenantCopyButton){
    tenantCopyButton.addEventListener('click', async ()=>{
      const link = tenantLink ? tenantLink.value : '';
      if(!link) return;

      try{
        await navigator.clipboard.writeText(link);
        tenantCopyButton.textContent = 'Link copiado';
      } catch(error){
        if(tenantLink){
          tenantLink.select();
          document.execCommand('copy');
        }
        tenantCopyButton.textContent = 'Link copiado';
      }
    });
  }

const progressBar = document.getElementById('progressBar');
const backTop = document.getElementById('backTop');
if(progressBar){
  window.addEventListener('scroll', ()=>{
    const h = document.documentElement;
    const scrollable = h.scrollHeight - h.clientHeight;
    const scrolled = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
    progressBar.style.width = `${scrolled}%`;
    if(backTop) backTop.classList.toggle('show', h.scrollTop > 500);
  });
}
if(backTop){
  backTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}

document.querySelectorAll('.cat-pill').forEach(pill=>{
  pill.addEventListener('click', ()=>{
    document.querySelectorAll('.cat-pill').forEach(item=>item.classList.remove('active'));
    pill.classList.add('active');
  });
});

const tocLinks = document.querySelectorAll('.toc-link');
if(tocLinks.length){
  const sections = Array.from(tocLinks).map(link => document.querySelector(link.getAttribute('href')));
  window.addEventListener('scroll', ()=>{
    let current = sections[0];
    sections.forEach(section=>{
      if(section && section.getBoundingClientRect().top < 140) current = section;
    });
    if(current){
      tocLinks.forEach(link=> link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
    }
  });
}

document.querySelectorAll('[data-copy-current-link]').forEach(button=>{
  button.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(window.location.href);
      button.setAttribute('title', 'Link copiado');
    } catch(error){
      button.setAttribute('title', 'Copie o link da barra de endereço');
    }
  });
});
