describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Função clear all só aparece quando uma tarefa é concluída', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')
      .type('Roteiro de ES{enter}');

    cy.get('.todo-list li')
      .should('have.length', 3);

    cy.get('button.clear-completed').should('not.be.visible');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.get('button.clear-completed').should('be.visible');

  });

  it('Deleta todas as tarefas concluídas usando o clear completed', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')
      .type('Roteiro de ES{enter}');

    cy.get('.todo-list li')
      .should('have.length', 3);

    cy.get('.todo-list li .toggle')
      .first()
      .click();
    cy.get('.todo-list li .toggle').eq(1).click();
    cy.contains('Clear').click();

    cy.get('.todo-list li')
      .should('have.length', 1);
  });

  it('Altera o nome de uma determinada tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}');

    cy.contains('TP2 de ES').should('exist');

    cy.contains('TP2').dblclick({ force: true });

    cy.get('.todo-list li .edit').first().clear().type('TP2 de Engenharia de Software{enter}', { force: true });

    cy.contains('TP2 de Engenharia de Software').should('exist');

    cy.contains('TP2 de ES').should('not.exist');
  });
});