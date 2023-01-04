describe("Note testing", () => {
  it("Writing on the note -> persisting state", () => {
    cy.visit("http://localhost:3000/notebook");

    cy.get("[data-test='create_new_note']").click();
    cy.get("[data-test='notepad_parent']")
      .children()
      .type("hey");
    cy.get("[data-test='notepad_parent']")
      .children()
      .first().then(($content) => {
        const content = $content.html()
        // check to make sure it state persists
        cy.get("[data-test='filetree']")
          .children()
          .contains("get started")
          .click();
        cy.get("[data-test='filetree']")
          .children()
          .contains("New File")
          .click();
        cy.get("[data-test='notepad_parent']")
          .children()
          .first()
          .should("have.html", content);
      })
  })

  it("Does not overwrite other notes", () => {

    cy.visit("http://localhost:3000/notebook");

    cy.get("[data-test='create_new_note']").click();
    cy.get("[data-test='notepad_parent']")
      .children()
      .type("hey");
    cy.get("[data-test='notepad_parent']")
      .children()
      .first().then(($content) => {
        const content = $content.html()
        // should not overwrite others
        cy.get("[data-test='filetree']")
          .children()
          .contains("get started")
          .click();
        cy.get("[data-test='notepad_parent']")
          .children()
          .first()
          .should("not.have.html", content);
      })
  })
})

export { }; // to shut up a stupid warning
