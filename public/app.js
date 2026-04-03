const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  lang: localStorage.getItem('lang') || 'en'
};

const translations = {
  en: {
    pageTitle: 'Campus Jobs Platform',
    languageLabel: 'Language:',
    logoutBtn: 'Logout',
    notLoggedIn: 'Not logged in',
    loggedInAs: 'Logged in as',

    registerTitle: 'Register',
    registerBtn: 'Register',
    loginTitle: 'Login',
    loginBtn: 'Login',

    searchJobsTitle: 'Search Jobs',
    searchJobsBtn: 'Search',
    loadJobsBtn: 'Load all jobs',

    createJobTitle: 'Create Job (Employer)',
    createJobBtn: 'Create job',

    jobsTitle: 'Jobs',

    studentApplicationsTitle: 'My Applications (Student)',
    loadMyApplicationsBtn: 'Load my applications',

    employerApplicationsTitle: 'Applications to My Jobs (Employer)',
    loadEmployerApplicationsBtn: 'Load employer applications',

    messagesTitle: 'Messages',
    loadMessagesBtn: 'Load messages',
    sendMessageBtn: 'Send message',

    responseTitle: 'Response',

    registerNamePlaceholder: 'Name',
    registerEmailPlaceholder: 'Email',
    registerPasswordPlaceholder: 'Password',
    loginEmailPlaceholder: 'Email',
    loginPasswordPlaceholder: 'Password',

    keywordPlaceholder: 'Keyword',
    departmentPlaceholder: 'Department',
    employmentTypePlaceholder: 'Employment type',

    titleEnPlaceholder: 'Title EN',
    titleEsPlaceholder: 'Title ES',
    descriptionEnPlaceholder: 'Description EN',
    descriptionEsPlaceholder: 'Description ES',
    jobDepartmentPlaceholder: 'Department',
    jobEmploymentTypePlaceholder: 'Employment type',
    jobLocationPlaceholder: 'Location',
    jobSalaryPlaceholder: 'Salary',

    messageApplicationIdPlaceholder: 'Application ID',
    messageTextPlaceholder: 'Type message',

    departmentLabel: 'Department',
    employmentTypeLabel: 'Employment type',
    locationLabel: 'Location',
    salaryLabel: 'Salary',
    statusLabel: 'Status',
    studentLabel: 'Student',
    resumeLabel: 'Resume',
    coverLetterLabel: 'Cover letter',

    applyBtn: 'Apply',
    updateStatusBtn: 'Update status',
    openMessagesBtn: 'Open messages',

    resumePrompt: 'Resume text',
    coverLetterPrompt: 'Cover letter',
    senderFallback: 'User',
    loggedOut: 'Logged out'
  },

  es: {
    pageTitle: 'Plataforma de Empleo del Campus',
    languageLabel: 'Idioma:',
    logoutBtn: 'Cerrar sesión',
    notLoggedIn: 'No has iniciado sesión',
    loggedInAs: 'Has iniciado sesión como',

    registerTitle: 'Registro',
    registerBtn: 'Registrarse',
    loginTitle: 'Iniciar sesión',
    loginBtn: 'Entrar',

    searchJobsTitle: 'Buscar Vacantes',
    searchJobsBtn: 'Buscar',
    loadJobsBtn: 'Cargar todas las vacantes',

    createJobTitle: 'Crear Vacante (Empleador)',
    createJobBtn: 'Crear vacante',

    jobsTitle: 'Vacantes',

    studentApplicationsTitle: 'Mis Solicitudes (Estudiante)',
    loadMyApplicationsBtn: 'Cargar mis solicitudes',

    employerApplicationsTitle: 'Solicitudes a Mis Vacantes (Empleador)',
    loadEmployerApplicationsBtn: 'Cargar solicitudes del empleador',

    messagesTitle: 'Mensajes',
    loadMessagesBtn: 'Cargar mensajes',
    sendMessageBtn: 'Enviar mensaje',

    responseTitle: 'Respuesta',

    registerNamePlaceholder: 'Nombre',
    registerEmailPlaceholder: 'Correo electrónico',
    registerPasswordPlaceholder: 'Contraseña',
    loginEmailPlaceholder: 'Correo electrónico',
    loginPasswordPlaceholder: 'Contraseña',

    keywordPlaceholder: 'Palabra clave',
    departmentPlaceholder: 'Departamento',
    employmentTypePlaceholder: 'Tipo de empleo',

    titleEnPlaceholder: 'Título EN',
    titleEsPlaceholder: 'Título ES',
    descriptionEnPlaceholder: 'Descripción EN',
    descriptionEsPlaceholder: 'Descripción ES',
    jobDepartmentPlaceholder: 'Departamento',
    jobEmploymentTypePlaceholder: 'Tipo de empleo',
    jobLocationPlaceholder: 'Ubicación',
    jobSalaryPlaceholder: 'Salario',

    messageApplicationIdPlaceholder: 'ID de solicitud',
    messageTextPlaceholder: 'Escribe un mensaje',

    departmentLabel: 'Departamento',
    employmentTypeLabel: 'Tipo de empleo',
    locationLabel: 'Ubicación',
    salaryLabel: 'Salario',
    statusLabel: 'Estado',
    studentLabel: 'Estudiante',
    resumeLabel: 'Currículum',
    coverLetterLabel: 'Carta de presentación',

    applyBtn: 'Postularse',
    updateStatusBtn: 'Actualizar estado',
    openMessagesBtn: 'Abrir mensajes',

    resumePrompt: 'Texto del currículum',
    coverLetterPrompt: 'Carta de presentación',
    senderFallback: 'Usuario',
    loggedOut: 'Sesión cerrada'
  }
};

const output = document.getElementById('output');
const langSelect = document.getElementById('lang');
const currentUser = document.getElementById('currentUser');

langSelect.value = state.lang;

function tr(key) {
  return translations[state.lang]?.[key] || translations.en[key] || key;
}

function setOutput(data) {
  output.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

function saveAuth(token, user) {
  state.token = token;
  state.user = user;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  renderUser();
}

function logout() {
  state.token = '';
  state.user = null;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  renderUser();
  setOutput(tr('loggedOut'));
}

function renderUser() {
  if (!state.user) {
    currentUser.textContent = tr('notLoggedIn');
    document.getElementById('createJobSection').classList.add('hidden');
    document.getElementById('studentApplicationsSection').classList.add('hidden');
    document.getElementById('employerApplicationsSection').classList.add('hidden');
    return;
  }

  currentUser.textContent = `${tr('loggedInAs')} ${state.user.name} (${state.user.role})`;

  document.getElementById('createJobSection').classList.toggle('hidden', state.user.role !== 'EMPLOYER');
  document.getElementById('studentApplicationsSection').classList.toggle('hidden', state.user.role !== 'STUDENT');
  document.getElementById('employerApplicationsSection').classList.toggle('hidden', state.user.role !== 'EMPLOYER');
}

function applyTranslations() {
  document.getElementById('pageTitle').textContent = tr('pageTitle');
  document.getElementById('languageLabel').textContent = tr('languageLabel');
  document.getElementById('logoutBtn').textContent = tr('logoutBtn');

  document.getElementById('registerTitle').textContent = tr('registerTitle');
  document.getElementById('registerBtn').textContent = tr('registerBtn');

  document.getElementById('loginTitle').textContent = tr('loginTitle');
  document.getElementById('loginBtn').textContent = tr('loginBtn');

  document.getElementById('searchJobsTitle').textContent = tr('searchJobsTitle');
  document.getElementById('searchJobsBtn').textContent = tr('searchJobsBtn');
  document.getElementById('loadJobsBtn').textContent = tr('loadJobsBtn');

  document.getElementById('createJobTitle').textContent = tr('createJobTitle');
  document.getElementById('createJobBtn').textContent = tr('createJobBtn');

  document.getElementById('jobsTitle').textContent = tr('jobsTitle');

  document.getElementById('studentApplicationsTitle').textContent = tr('studentApplicationsTitle');
  document.getElementById('loadMyApplicationsBtn').textContent = tr('loadMyApplicationsBtn');

  document.getElementById('employerApplicationsTitle').textContent = tr('employerApplicationsTitle');
  document.getElementById('loadEmployerApplicationsBtn').textContent = tr('loadEmployerApplicationsBtn');

  document.getElementById('messagesTitle').textContent = tr('messagesTitle');
  document.getElementById('loadMessagesBtn').textContent = tr('loadMessagesBtn');
  document.getElementById('sendMessageBtn').textContent = tr('sendMessageBtn');

  document.getElementById('responseTitle').textContent = tr('responseTitle');

  document.getElementById('registerName').placeholder = tr('registerNamePlaceholder');
  document.getElementById('registerEmail').placeholder = tr('registerEmailPlaceholder');
  document.getElementById('registerPassword').placeholder = tr('registerPasswordPlaceholder');

  document.getElementById('loginEmail').placeholder = tr('loginEmailPlaceholder');
  document.getElementById('loginPassword').placeholder = tr('loginPasswordPlaceholder');

  document.getElementById('keyword').placeholder = tr('keywordPlaceholder');
  document.getElementById('department').placeholder = tr('departmentPlaceholder');
  document.getElementById('employmentType').placeholder = tr('employmentTypePlaceholder');

  document.getElementById('titleEn').placeholder = tr('titleEnPlaceholder');
  document.getElementById('titleEs').placeholder = tr('titleEsPlaceholder');
  document.getElementById('descriptionEn').placeholder = tr('descriptionEnPlaceholder');
  document.getElementById('descriptionEs').placeholder = tr('descriptionEsPlaceholder');
  document.getElementById('jobDepartment').placeholder = tr('jobDepartmentPlaceholder');
  document.getElementById('jobEmploymentType').placeholder = tr('jobEmploymentTypePlaceholder');
  document.getElementById('jobLocation').placeholder = tr('jobLocationPlaceholder');
  document.getElementById('jobSalary').placeholder = tr('jobSalaryPlaceholder');

  document.getElementById('messageApplicationId').placeholder = tr('messageApplicationIdPlaceholder');
  document.getElementById('messageText').placeholder = tr('messageTextPlaceholder');

  renderUser();
}

function apiUrl(path, params = {}) {
  const url = new URL(path, window.location.origin);
  url.searchParams.set('lang', state.lang);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function request(path, options = {}, params = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(apiUrl(path, params), {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

async function register() {
  try {
    const data = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        role: document.getElementById('registerRole').value
      })
    });

    saveAuth(data.token, data.user);
    setOutput(data);
  } catch (error) {
    setOutput(error.message);
  }
}

async function login() {
  try {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
      })
    });

    saveAuth(data.token, data.user);
    setOutput(data);
  } catch (error) {
    setOutput(error.message);
  }
}

async function loadJobs() {
  try {
    const params = {
      keyword: document.getElementById('keyword').value,
      department: document.getElementById('department').value,
      employmentType: document.getElementById('employmentType').value
    };

    const jobs = await request('/api/jobs', { method: 'GET' }, params);
    renderJobs(jobs);
    setOutput(jobs);
  } catch (error) {
    setOutput(error.message);
  }
}

function renderJobs(jobs) {
  const container = document.getElementById('jobsList');
  container.innerHTML = '';

  jobs.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-card';
    div.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.description}</p>
      <p><strong>${tr('departmentLabel')}:</strong> ${job.department || '-'}</p>
      <p><strong>${tr('employmentTypeLabel')}:</strong> ${job.employmentType}</p>
      <p><strong>${tr('locationLabel')}:</strong> ${job.location || '-'}</p>
      <p><strong>${tr('salaryLabel')}:</strong> ${job.salary || '-'}</p>
      <p><strong>${tr('statusLabel')}:</strong> ${job.status}</p>
    `;

    if (state.user?.role === 'STUDENT') {
      const btn = document.createElement('button');
      btn.textContent = tr('applyBtn');
      btn.onclick = async () => {
        const resumeText = prompt(tr('resumePrompt'));
        const coverLetter = prompt(tr('coverLetterPrompt'));

        try {
          const data = await request(`/api/jobs/${job.id}/apply`, {
            method: 'POST',
            body: JSON.stringify({ resumeText, coverLetter })
          });
          setOutput(data);
        } catch (error) {
          setOutput(error.message);
        }
      };
      div.appendChild(btn);
    }

    container.appendChild(div);
  });
}

async function createJob() {
  try {
    const data = await request('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({
        titleEn: document.getElementById('titleEn').value,
        titleEs: document.getElementById('titleEs').value,
        descriptionEn: document.getElementById('descriptionEn').value,
        descriptionEs: document.getElementById('descriptionEs').value,
        department: document.getElementById('jobDepartment').value,
        employmentType: document.getElementById('jobEmploymentType').value,
        location: document.getElementById('jobLocation').value,
        salary: document.getElementById('jobSalary').value,
        status: document.getElementById('jobStatus').value
      })
    });

    setOutput(data);
    loadJobs();
  } catch (error) {
    setOutput(error.message);
  }
}

async function loadMyApplications() {
  try {
    const applications = await request('/api/applications/my');
    const container = document.getElementById('studentApplications');
    container.innerHTML = '';

    applications.forEach(app => {
      const div = document.createElement('div');
      div.className = 'app-card';
      div.innerHTML = `
        <h3>${app.job.title}</h3>
        <p><strong>${tr('statusLabel')}:</strong> ${app.status}</p>
        <p><strong>${tr('resumeLabel')}:</strong> ${app.resumeText || '-'}</p>
        <p><strong>${tr('coverLetterLabel')}:</strong> ${app.coverLetter || '-'}</p>
        <button onclick="openMessages(${app.id})">${tr('openMessagesBtn')}</button>
      `;
      container.appendChild(div);
    });

    setOutput(applications);
  } catch (error) {
    setOutput(error.message);
  }
}

async function loadEmployerApplications() {
  try {
    const applications = await request('/api/employer/applications');
    const container = document.getElementById('employerApplications');
    container.innerHTML = '';

    applications.forEach(app => {
      const div = document.createElement('div');
      div.className = 'app-card';

      div.innerHTML = `
        <h3>${app.job.title}</h3>
        <p><strong>${tr('studentLabel')}:</strong> ${app.student.name} (${app.student.email})</p>
        <p><strong>${tr('statusLabel')}:</strong> ${app.status}</p>
        <p><strong>${tr('resumeLabel')}:</strong> ${app.resumeText || '-'}</p>
        <p><strong>${tr('coverLetterLabel')}:</strong> ${app.coverLetter || '-'}</p>
        <div class="small-row">
          <select id="status-${app.id}">
            <option value="SUBMITTED">SUBMITTED</option>
            <option value="REVIEWING">REVIEWING</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <button onclick="updateApplicationStatus(${app.id})">${tr('updateStatusBtn')}</button>
          <button onclick="openMessages(${app.id})">${tr('openMessagesBtn')}</button>
        </div>
      `;

      container.appendChild(div);
      setTimeout(() => {
        const select = document.getElementById(`status-${app.id}`);
        if (select) select.value = app.status;
      }, 0);
    });

    setOutput(applications);
  } catch (error) {
    setOutput(error.message);
  }
}

async function updateApplicationStatus(applicationId) {
  try {
    const status = document.getElementById(`status-${applicationId}`).value;
    const data = await request(`/api/applications/${applicationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    setOutput(data);
    loadEmployerApplications();
  } catch (error) {
    setOutput(error.message);
  }
}

function openMessages(applicationId) {
  document.getElementById('messageApplicationId').value = applicationId;
  loadMessages();
}

async function loadMessages() {
  try {
    const applicationId = document.getElementById('messageApplicationId').value;
    const messages = await request(`/api/applications/${applicationId}/messages`);
    const container = document.getElementById('messagesList');
    container.innerHTML = '';

    messages.forEach(message => {
      const div = document.createElement('div');
      div.className = 'message-card';
      div.innerHTML = `
        <p><strong>${message.sender?.name || tr('senderFallback')} (${message.sender?.role || ''})</strong></p>
        <p>${message.messageText}</p>
        <small>${new Date(message.createdAt).toLocaleString()}</small>
      `;
      container.appendChild(div);
    });

    setOutput(messages);
  } catch (error) {
    setOutput(error.message);
  }
}

async function sendMessage() {
  try {
    const applicationId = document.getElementById('messageApplicationId').value;
    const messageText = document.getElementById('messageText').value;

    const data = await request(`/api/applications/${applicationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ messageText })
    });

    document.getElementById('messageText').value = '';
    setOutput(data);
    loadMessages();
  } catch (error) {
    setOutput(error.message);
  }
}

document.getElementById('registerBtn').onclick = register;
document.getElementById('loginBtn').onclick = login;
document.getElementById('logoutBtn').onclick = logout;
document.getElementById('searchJobsBtn').onclick = loadJobs;
document.getElementById('loadJobsBtn').onclick = loadJobs;
document.getElementById('createJobBtn').onclick = createJob;
document.getElementById('loadMyApplicationsBtn').onclick = loadMyApplications;
document.getElementById('loadEmployerApplicationsBtn').onclick = loadEmployerApplications;
document.getElementById('loadMessagesBtn').onclick = loadMessages;
document.getElementById('sendMessageBtn').onclick = sendMessage;

langSelect.onchange = () => {
  state.lang = langSelect.value;
  localStorage.setItem('lang', state.lang);
  applyTranslations();
  loadJobs();

  if (state.user?.role === 'STUDENT') {
    loadMyApplications();
  }

  if (state.user?.role === 'EMPLOYER') {
    loadEmployerApplications();
  }
};

renderUser();
applyTranslations();
loadJobs();

window.openMessages = openMessages;
window.updateApplicationStatus = updateApplicationStatus;
