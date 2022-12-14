
/**
 * Alunos
 */

const studentModal = document.querySelector('#student-modal');
const studentForm = document.querySelector('#student-form');
const studentModalTitle = document.querySelector('#student-modal-title')
const saveStudentButton = document.querySelector('#save-student')

/**
 * Função responsável abrir o modal de estudante
 */
const openStudentModal = () => studentModal.showModal();

/**
 * Função responsável fechar o modal de estudante
 */
const closeStudentModal = () => studentModal.close();

/**
 * Função responsável por criar linhas na tabela student-table
 * @param {nome} string
 * @param {matricula} string
 * @param {curso} string
 * @param {id} string
 */
const createStudentTableRow = (nome, matricula, curso, id) => {
  const studentTable = document.querySelector('#student-table tbody')
  const tableTr = document.createElement('tr');
  tableTr.innerHTML = ` 
  <td>${nome}</td>
  <td>${matricula}</td>
  <td>${curso}</td>
  <td align="center">
    <button class="button button--danger" onclick=deleteStudentTable(${id})>Apagar</button>
    <button class="button button--success" onclick="editdStudentModal(${id})">Editar</button>
  </td>`;
  studentTable.appendChild(tableTr);
}

/**
 * Função responsável salvar os dados de um estudante
 * @param {url} string
 * @param {method} string
 */
const saveStundentData = (url, method) => {
  studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
      method: method,
      body: payload
    })
      .catch(error => {
        closeStudentModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
      })

  });
}

/**
 * Função responsável abrir o modal de aluno e salvar um novo aluno
 * @param {studentId} string
 */
const createStudent = () => {
  openStudentModal();
  studentModalTitle.textContent = 'Novo Aluno';
  saveStudentButton.textContent = 'Criar';
  saveStundentData('http://localhost:3000/alunos', 'POST');
}

/**
 * Função responsável abrir o modal de edição e carregar os dados de um estudante e salvar os dados da edição
 * @param {studentId} string
 */
const editdStudentModal = async (studentId) => {
  const url = `http://localhost:3000/alunos/${studentId}`;
  openStudentModal();
  studentModalTitle.textContent = 'Editar aluno';
  saveStudentButton.textContent = 'Editar';
  const [name, matricula] = document.querySelectorAll('input');
  const selectCurso = document.querySelector("#curso");
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      name.value = data.nome
      matricula.value = data.matricula
      selectCurso.value = data.curso
    })
  saveStundentData(url, 'PUT');
};

/**
 * Função responsável por apagar dados de um estutande
 * @param {studentId} string
 */
const deleteStudentTable = async (studentId) =>
  fetch(`http://localhost:3000/alunos/${studentId}`, { method: 'DELETE' });

/**
 * Função responsável por carregar os dados da student-table
 */
const loadStudentTable = () => {
  fetch('http://localhost:3000/alunos')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(item => {
        createStudentTableRow(item.nome, item.matricula, item.curso, item.id)
      })
    }).catch((error) => {
      alert('ocorreu um erro tente mais tarde')
      console.error(error);
    });
};

loadStudentTable();

/**
 * Disciplinas
 */

const subjectModal = document.querySelector('#subject-modal');
const subjectForm = document.querySelector('#subject-form');
const subjectModalTitle = document.querySelector('#subject-modal-title')
const saveSubjectButton = document.querySelector('#save-subject')

/**
 * Função responsável abrir o modal de disciplina
 */
const openSubjectModal = () => subjectModal.showModal();

/**
 * Função responsável fechar o modal de disciplina
 */
const closeSubjectModal = () => subjectModal.close();

/**
 * Função responsável abrir o modal de disciplina e salvar uma nova disciplina
 * 
 */
const createSubject = () => {
  openSubjectModal();
  subjectModalTitle.textContent = 'Nova disciplina';
  saveSubjectButton.textContent = 'Criar';
  saveSubjectData('http://localhost:3000/disciplinas', 'POST');
}


/**
 * Função responsável por criar card e mostrar informações de cada disciplina
 * @param {id} string
 * @param {nome} string
 * @param {cargaHoraria} string
 @param {professor} string
 @param {status} string
 @param {observacoes} string
 */
const createSubjectModal = (id, nome, cargaHoraria, professor, status, observacoes) => {
  const subjectCard = document.querySelector('.subject-list')
  const card = document.createElement('div');
  card.setAttribute('class', 'subject-card')
  const statusClass = status == "Opcional" ? "tag tag--success" : "tag tag--danger";
  card.innerHTML = ` 
  <h3 class="subject-card__title">${nome}</h3>
<hr/>
<ul class="subject-card__list" >
  <li>Carga horária: ${cargaHoraria}</li>
  <li>Professor: ${professor}</li>
  <li>Status da disciplina: <span class="${statusClass}">${status}</span></li>
</ul>
  <p>${observacoes}</p>
<div class="button-js">
 <button class="button button--danger" onclick=deleteSubjectModal(${id})>Apagar</button>
  <button  class="button button--success" onclick="editSubjectModal(${id})">Editar</button>
  </div>`;
  subjectCard.appendChild(card);
}

/**
 * Função responsável salvar os dados de uma disciplina
 * @param {url} string
 * @param {method} string
 */
const saveSubjectData = (url, method) => {
  subjectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(subjectForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
      method: method,
      body: payload
    })
      .catch(error => {
        closeSubjectModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
      })

  });
}
/**
 * Função responsável por carregar os dados de disciplinas
 */
const loadSubjectModal = () => {
  fetch('http://localhost:3000/disciplinas')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(subject => {
        createSubjectModal(subject.id, subject.nome, subject.carga, subject.professor, subject.status, subject.usuario_msg)
      })
    }).catch((error) => {
      alert('ocorreu um erro tente mais tarde')
      console.error(error);
    });
};

loadSubjectModal();

/**
 * Função responsável por apagar dados de uma disciplina
 * @param {subjectId} string
 */
const deleteSubjectModal = async (subjectId) =>
  fetch(`http://localhost:3000/disciplinas/${subjectId}`, { method: 'DELETE' });

/**
 * Função responsável abrir o modal de edição e carregar os dados de uma disciplina e salvar os dados da edição
 * @param {subjectId} string
 */
const editSubjectModal = async (subjectId) => {
  const url = `http://localhost:3000/disciplinas/${subjectId}`;
  openSubjectModal();
  subjectModalTitle.textContent = 'Editar disciplinas';
  saveSubjectButton.textContent = 'Editar';
  const nome = document.querySelector("#nomed");
  const carga = document.querySelector("#carga");
  const professor = document.querySelector("#professor");
  const usuario_msg = document.querySelector("#msg");
  const status = document.querySelector("#status");
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      nome.value = data.nome
      carga.value = data.carga
      professor.value = data.professor
      status.value = data.status
      usuario_msg.value = data.usuario_msg


    })
  saveSubjectData(url, 'PUT');

};
