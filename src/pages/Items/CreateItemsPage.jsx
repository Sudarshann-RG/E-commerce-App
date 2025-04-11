import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateItemsPage = () => {
  const [formData, setFormData] = useState({ id: '', title: '', price: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/Items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create item');
      }
      // Redirect to ItemsPage after successful creation
      navigate('/items');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return(
    <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="id" >ID</label>
                <input placeholder="101" type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="title">Title</label>
                <input placeholder="Marvelous Mug" type="text" id="title" name="title" value={formData.title} onChange={handleChange}  />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input placeholder="10.99" type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div >
                <button type="submit" >
                  Create Item
                </button>
            </div>
    </form>
  );
}

export default CreateItemsPage;