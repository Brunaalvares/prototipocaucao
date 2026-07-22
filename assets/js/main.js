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
