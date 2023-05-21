import { useMemo, useState } from 'react';

export interface ICategory {
  id: number;
  title: string;
  subcategories: ICategory[];
}

interface ICategoryItemProps {
  category: ICategory;
  onDeleteCategory: (id: number) => void;
  onEditCategory: (id: number, newTitle: string) => void;
  onAddSubcategory: (id: number, subcategory: ICategory) => void;
  bgColor?: string;
}

export const CategoryItem: React.FC<ICategoryItemProps> = ({
  category,
  onDeleteCategory,
  onEditCategory,
  onAddSubcategory,
  bgColor,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [level, setLevel] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  const categoryNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const addSubcategoryHandler = () => {
    const newSubcategory: ICategory = {
      id: Date.now(),
      title: 'New Subcategory',
      subcategories: [],
    };
    onAddSubcategory(category.id, newSubcategory);
  };

  const deleteCategoryHandler = () => {
    onDeleteCategory(category.id);
  };

  const editCategoryHandler = () => {
    onEditCategory(category.id, categoryName);
  };

  const confirmCategoryHandler = () => {
    editCategoryHandler();
    setLevel(2);
    setIsDisabled(true);
  };

  const generateRandomColor = () => {
    const red = Math.floor(Math.random() * 128);
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);
    const color = `rgb(${red}, ${green}, ${blue})`;
    return color;
  };

  const randomColor = useMemo(() => generateRandomColor(), []);

  return (
    <div className="category">
      {level === 1 && (
        <>
          <input
            type="text"
            value={categoryName}
            onChange={categoryNameHandler}
            placeholder="Category name"
            autoFocus
          />
          <button onClick={deleteCategoryHandler} className="control-btn cancel-btn">
            &times;
          </button>
          <button onClick={confirmCategoryHandler} className="control-btn confirm-btn">
            &#10003;
          </button>
        </>
      )}

      {level === 2 && (
        <>
          <input
            style={{
              backgroundColor: `${bgColor}`,
            }}
            type="text"
            value={categoryName}
            onChange={categoryNameHandler}
            disabled={isDisabled}
          />
          <button onClick={addSubcategoryHandler} className="control-btn add-btn">
            &#43;
          </button>

          {isDisabled ? (
            <button onClick={() => setIsDisabled(false)} className="control-btn edit-btn">
              &#128393;
            </button>
          ) : (
            <button
              onClick={() => {
                editCategoryHandler();
                setIsDisabled(true);
              }}
              className="control-btn confirm-btn"
            >
              &#10003;
            </button>
          )}

          <button onClick={deleteCategoryHandler} className="control-btn delete-btn">
            &times;
          </button>
        </>
      )}

      {category.subcategories.length > 0 && (
        <div className="category__subcategories">
          {category.subcategories.map((subitem) => (
            <CategoryItem
              bgColor={randomColor}
              key={subitem.id}
              category={subitem}
              onDeleteCategory={onDeleteCategory}
              onEditCategory={onEditCategory}
              onAddSubcategory={onAddSubcategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};
