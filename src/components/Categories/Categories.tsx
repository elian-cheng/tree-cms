import { useCallback, useContext, useState } from 'react';
import { IPosition, PositionContext } from '../../store/positionContext';
import DraggableContainer from '../../components/DraggableContainer/DraggableContainer';
import { CategoryItem, ICategory } from '../../components/CategoryItem/CategoryItem';

const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { setPosition } = useContext(PositionContext);

  const arrowNavigationHandler = useCallback(
    (coordinate: keyof IPosition, value: number) => {
      setPosition?.((prevPosition) => {
        const updatedPosition = { ...prevPosition };
        updatedPosition[coordinate] += value;
        return updatedPosition;
      });
    },
    [setPosition]
  );

  const addCategoryHandler = () => {
    setCategories([...categories, { id: Date.now(), title: 'New Category', subcategories: [] }]);
  };

  const deleteCategoryHandler = (id: number) => {
    const deleteItem = (categories: ICategory[]): ICategory[] => {
      return categories.filter((item) => {
        if (item.id === id) {
          return false;
        }
        if (item.subcategories.length > 0) {
          item.subcategories = deleteItem(item.subcategories);
        }
        return true;
      });
    };

    const updatedCategories = deleteItem([...categories]);
    setCategories(updatedCategories);
  };

  const editCategoryHandler = (id: number, newTitle: string) => {
    const editItem = (items: ICategory[]): ICategory[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, title: newTitle };
        }
        if (item.subcategories.length > 0) {
          item.subcategories = editItem(item.subcategories);
        }
        return item;
      });
    };

    const updatedItems = editItem([...categories]);
    setCategories(updatedItems);
  };
  const addSubcategoryHandler = (id: number, newSubCategory: ICategory) => {
    const updateItems = (items: ICategory[]): ICategory[] => {
      return items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            subcategories: [...item.subcategories, newSubCategory],
          };
        } else if (item.subcategories.length > 0) {
          return { ...item, subcategories: updateItems(item.subcategories) };
        }
        return item;
      });
    };

    const updatedCategories = updateItems([...categories]);
    setCategories(updatedCategories);
  };

  return (
    <main className="main">
      <DraggableContainer>
        <div className="categories">
          <div className="categories__main-item">
            <p>Categories</p>
            <button onClick={addCategoryHandler}>&#43;</button>
          </div>
        </div>
        {categories.length !== 0 && (
          <div className="categories__list">
            {categories.map((item) => (
              <CategoryItem
                key={item.id}
                category={item}
                onDeleteCategory={deleteCategoryHandler}
                onEditCategory={editCategoryHandler}
                onAddSubcategory={addSubcategoryHandler}
              />
            ))}
          </div>
        )}
      </DraggableContainer>
      <button className="scroll-btn scroll-up" onClick={() => arrowNavigationHandler('y', 50)}>
        &#708;
      </button>
      <button className="scroll-btn scroll-down" onClick={() => arrowNavigationHandler('y', -50)}>
        &#709;
      </button>
      <button className="scroll-btn scroll-left" onClick={() => arrowNavigationHandler('x', 50)}>
        &#706;
      </button>
      <button className="scroll-btn scroll-right" onClick={() => arrowNavigationHandler('x', -50)}>
        &#707;
      </button>
    </main>
  );
};
export default Categories;
