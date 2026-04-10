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

notificationsTitle: 'Notifications',
loadNotificationsBtn: 'Load notifications',
markAsReadBtn: 'Mark as read',




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

notificationsTitle: 'Notificaciones',
loadNotificationsBtn: 'Cargar notificaciones',
markAsReadBtn: 'Marcar como leído',


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

const byId = (id) => document.getElementById(id);

const output = byId('output');
const langSelect = byId('lang');
const currentUser = byId('currentUser');

if (langSelect) {
  langSelect.value = state.lang;
}

function tr(key) {
  return translations[state.lang]?.[key] || translations.en[key] || key;
}

function setOutput(data) {
  if (!output) return;
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
  const createJobSection = byId('createJobSection');
  const studentApplicationsSection = byId('studentApplicationsSection');
  const employerApplicationsSection = byId('employerApplicationsSection');

  if (!currentUser) return;

  if (!state.user) {
    currentUser.textContent = tr('notLoggedIn');
    if (createJobSection) createJobSection.classList.add('hidden');
    if (studentApplicationsSection) studentApplicationsSection.classList.add('hidden');
    if (employerApplicationsSection) employerApplicationsSection.classList.add('hidden');
    return;
  }

  currentUser.textContent = `${tr('loggedInAs')} ${state.user.name} (${state.user.role})`;

  if (createJobSection) createJobSection.classList.toggle('hidden', state.user.role !== 'EMPLOYER');
  if (studentApplicationsSection) studentApplicationsSection.classList.toggle('hidden', state.user.role !== 'STUDENT');
  if (employerApplicationsSection) employerApplicationsSection.classList.toggle('hidden', state.user.role !== 'EMPLOYER');
}

function applyTranslations() {
  const textMap = {
    pageTitle: 'pageTitle',
    languageLabel: 'languageLabel',
    logoutBtn: 'logoutBtn',
    registerTitle: 'registerTitle',
    registerBtn: 'registerBtn',
    loginTitle: 'loginTitle',
    loginBtn: 'loginBtn',
    searchJobsTitle: 'searchJobsTitle',
    searchJobsBtn: 'searchJobsBtn',
    loadJobsBtn: 'loadJobsBtn',
    createJobTitle: 'createJobTitle',
    createJobBtn: 'createJobBtn',
    jobsTitle: 'jobsTitle',
    studentApplicationsTitle: 'studentApplicationsTitle',
    loadMyApplicationsBtn: 'loadMyApplicationsBtn',
    employerApplicationsTitle: 'employerApplicationsTitle',
    loadEmployerApplicationsBtn: 'loadEmployerApplicationsBtn',
    messagesTitle: 'messagesTitle',
    loadMessagesBtn: 'loadMessagesBtn',
    sendMessageBtn: 'sendMessageBtn',
    responseTitle: 'responseTitle',
notificationsTitle: 'notificationsTitle',
loadNotificationsBtn: 'loadNotificationsBtn'
  };

  Object.entries(textMap).forEach(([id, key]) => {
    const el = byId(id);
    if (el) el.textContent = tr(key);
  });

  const placeholderMap = {
    registerName: 'registerNamePlaceholder',
    registerEmail: 'registerEmailPlaceholder',
    registerPassword: 'registerPasswordPlaceholder',
    loginEmail: 'loginEmailPlaceholder',
    loginPassword: 'loginPasswordPlaceholder',
    keyword: 'keywordPlaceholder',
    department: 'departmentPlaceholder',
    employmentType: 'employmentTypePlaceholder',
    titleEn: 'titleEnPlaceholder',
    titleEs: 'titleEsPlaceholder',
    descriptionEn: 'descriptionEnPlaceholder',
    descriptionEs: 'descriptionEsPlaceholder',
    jobDepartment: 'jobDepartmentPlaceholder',
    jobEmploymentType: 'jobEmploymentTypePlaceholder',
    jobLocation: 'jobLocationPlaceholder',
    jobSalary: 'jobSalaryPlaceholder',
    messageApplicationId: 'messageApplicationIdPlaceholder',
    messageText: 'messageTextPlaceholder'
  };

  Object.entries(placeholderMap).forEach(([id, key]) => {
    const el = byId(id);
    if (el) el.placeholder = tr(key);
  });

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
    ...(options.headers || {})
  };

  const isFormData = options.body instanceof FormData;

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

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
        name: byId('registerName')?.value || '',
        email: byId('registerEmail')?.value || '',
        password: byId('registerPassword')?.value || '',
        role: byId('registerRole')?.value || 'STUDENT'
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
        email: byId('loginEmail')?.value || '',
        password: byId('loginPassword')?.value || ''
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
      keyword: byId('keyword')?.value || '',
      department: byId('department')?.value || '',
      employmentType: byId('employmentType')?.value || ''
    };

    const jobs = await request('/api/jobs', { method: 'GET' }, params);
    renderJobs(jobs);
    setOutput(jobs);
  } catch (error) {
    setOutput(error.message);
  }
}

function renderJobs(jobs) {
  const container = byId('jobsList');
  if (!container) return;

  container.innerHTML = '';

  jobs.forEach((job) => {
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
${
  job.requirements && job.requirements.length
    ? `<div><strong>Requirements:</strong><ul>${job.requirements
        .map((req) => `<li>${req.description}${req.skill ? ` (${req.skill})` : ''}</li>`)
        .join('')}</ul></div>`
    : ''
}
    `;

    if (state.user?.role === 'STUDENT') {
      const form = document.createElement('form');
      form.className = 'app-card';
      form.enctype = 'multipart/form-data';

      form.innerHTML = `
        <textarea name="resumeText" placeholder="${tr('resumePrompt')}"></textarea>
        <textarea name="coverLetter" placeholder="${tr('coverLetterPrompt')}"></textarea>
        <input name="resumeFile" type="file" accept=".pdf,.doc,.docx" />
        <button type="submit">${tr('applyBtn')}</button>
      `;

      form.onsubmit = async (e) => {
        e.preventDefault();

        const fileInput = form.querySelector('input[name="resumeFile"]');
        const file = fileInput?.files?.[0];

        console.log('Selected file:', file);

        if (!file) {
          setOutput('Resume file is required');
          return;
        }

        const formData = new FormData(form);

        try {
          const data = await request(`/api/jobs/${job.id}/apply`, {
            method: 'POST',
            body: formData
          });
          setOutput(data);
        } catch (error) {
          setOutput(error.message);
        }
      };

      div.appendChild(form);
    }

    container.appendChild(div);
  });
}
async function createJob() {
  try {
    const data = await request('/api/jobs', {
      method: 'POST',
	body: JSON.stringify({
  titleEn: byId('titleEn')?.value || '',
  titleEs: byId('titleEs')?.value || '',
  descriptionEn: byId('descriptionEn')?.value || '',
  descriptionEs: byId('descriptionEs')?.value || '',
  employmentType: byId('jobEmploymentType')?.value || '',
  location: byId('jobLocation')?.value || '',
  salary: byId('jobSalary')?.value || '',
  status: byId('jobStatus')?.value || 'DRAFT',
  categoryId: byId('jobCategory')?.value || '',
  departmentId: byId('jobDepartment')?.value || ''
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
    const container = byId('studentApplications');
    if (!container) return;

    container.innerHTML = '';

    applications.forEach((app) => {
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
    const container = byId('employerApplications');
    if (!container) return;

    container.innerHTML = '';

    applications.forEach((app) => {
      const div = document.createElement('div');
      div.className = 'app-card';
div.innerHTML = `
  <h3>${app.job.title}</h3>
  <p><strong>${tr('studentLabel')}:</strong> ${app.student.name} (${app.student.email})</p>
  <p><strong>${tr('statusLabel')}:</strong> ${app.status}</p>
  <p><strong>${tr('resumeLabel')}:</strong> ${app.resumeText || '-'}</p>
  <p><strong>${tr('coverLetterLabel')}:</strong> ${app.coverLetter || '-'}</p>
  <p><strong>Resume file:</strong> ${
    app.resume
      ? `<a href="${app.resume.fileUrl}" target="_blank">${app.resume.fileName}</a>`
      : '-'
  }</p>
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
        const select = byId(`status-${app.id}`);
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
    const status = byId(`status-${applicationId}`)?.value || 'SUBMITTED';
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
  const input = byId('messageApplicationId');
  if (input) input.value = applicationId;
  loadMessages();
}

async function loadMessages() {
  try {
    const applicationId = byId('messageApplicationId')?.value || '';
    const messages = await request(`/api/applications/${applicationId}/messages`);
    const container = byId('messagesList');
    if (!container) return;

    container.innerHTML = '';

    messages.forEach((message) => {
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
    const applicationId = byId('messageApplicationId')?.value || '';
    const messageText = byId('messageText')?.value || '';

    const data = await request(`/api/applications/${applicationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ messageText })
    });

    if (byId('messageText')) byId('messageText').value = '';
    setOutput(data);
    loadMessages();
  } catch (error) {
    setOutput(error.message);
  }
}
async function loadCategories() {
  try {
    const categories = await request('/api/categories');
    const select = byId('jobCategory');
    if (!select) return;

    select.innerHTML = `<option value="">Select category</option>`;
    categories.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      select.appendChild(option);
    });
  } catch (error) {
    setOutput(error.message);
  }
}

async function loadDepartments() {
  try {
    const departments = await request('/api/departments');
    const select = byId('jobDepartment');
    if (!select) return;

    select.innerHTML = `<option value="">Select department</option>`;
    departments.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      select.appendChild(option);
    });
  } catch (error) {
    setOutput(error.message);
  }
}

async function loadSkills() {
  try {
    const skills = await request('/api/skills');

    const select = byId('requirementSkill');
    if (select) {
      select.innerHTML = `<option value="">Select skill</option>`;
      skills.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
      });
    }

    return skills;
  } catch (error) {
    setOutput(error.message);
    return [];
  }
}

async function createRequirement() {
  try {
    const jobId = byId('requirementJobId')?.value || '';

    if (!jobId) {
      setOutput('Job ID is required');
      return;
    }

    const data = await request(`/api/jobs/${jobId}/requirements`, {
      method: 'POST',
      body: JSON.stringify({
        skillId: byId('requirementSkill')?.value || '',
        descriptionEn: byId('requirementDescriptionEn')?.value || '',
        descriptionEs: byId('requirementDescriptionEs')?.value || '',
        isRequired: (byId('requirementIsRequired')?.value || 'true') === 'true'
      })
    });

    setOutput(data);
    loadJobs();
  } catch (error) {
    setOutput(error.message);
  }
}


async function loadNotifications() {
  try {
    const notifications = await request('/api/notifications/my');
    const container = byId('notificationsList');
    if (!container) return;

    container.innerHTML = '';

    notifications.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'message-card';
      div.innerHTML = `
        <p><strong>${item.title}</strong></p>
        <p>${item.message}</p>
        <p><strong>Read:</strong> ${item.isRead ? 'Yes' : 'No'}</p>
        <small>${new Date(item.createdAt).toLocaleString()}</small>
        ${
          !item.isRead
            ? `<div class="small-row"><button onclick="markNotificationAsRead(${item.id})">${tr('markAsReadBtn')}</button></div>`
            : ''
        }
      `;
      container.appendChild(div);
    });

    setOutput(notifications);
  } catch (error) {
    setOutput(error.message);
  }
}

async function markNotificationAsRead(notificationId) {
  try {
    const data = await request(`/api/notifications/${notificationId}/read`, {
      method: 'PATCH',
      body: JSON.stringify({})
    });
    setOutput(data);
    loadNotifications();
  } catch (error) {
    setOutput(error.message);
  }
}

function bindClick(id, handler) {
  const el = byId(id);
  if (el) el.onclick = handler;
}

bindClick('registerBtn', register);
bindClick('loginBtn', login);
bindClick('logoutBtn', logout);
bindClick('searchJobsBtn', loadJobs);
bindClick('loadJobsBtn', loadJobs);
bindClick('createJobBtn', createJob);
bindClick('loadMyApplicationsBtn', loadMyApplications);
bindClick('loadEmployerApplicationsBtn', loadEmployerApplications);
bindClick('loadMessagesBtn', loadMessages);
bindClick('sendMessageBtn', sendMessage);
bindClick('createRequirement', createRequirement);
bindClick('loadNotificationsBtn', loadNotifications);

if (langSelect) {
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
}

renderUser();
applyTranslations();
loadCategories();
loadDepartments();
loadJobs();

window.openMessages = openMessages;
window.updateApplicationStatus = updateApplicationStatus;
window.markNotificationAsRead = markNotificationAsRead;
