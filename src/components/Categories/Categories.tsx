const Categories = () => {
  return (
    <main className="main">
      <div className="categories">
        <div className="categories__main-item">
          <p>Categories</p>
          <button>&#43;</button>
        </div>
      </div>
      <button className="scroll-btn scroll-up">&#708;</button>
      <button className="scroll-btn scroll-down">&#709;</button>
      <button className="scroll-btn scroll-left">&#706;</button>
      <button className="scroll-btn scroll-right">&#707;</button>
    </main>
  );
};
export default Categories;
