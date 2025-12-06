describe('Portfolio Home Page', () => {
  it('loads successfully', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Home');   
  });
});
