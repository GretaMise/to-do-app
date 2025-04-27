import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { URL } from '../../constants/global';

interface ToDoItem {
  _id: string;
  name: string;
  task: string;
  isEditing: boolean;
}

export const ToDoList: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [toDos, setToDos] = useState<ToDoItem[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${URL}/tasks`);
      const tasksWithEditing = response.data;
      setToDos(tasksWithEditing);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(`${URL}/tasks`);
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const startEditing = (id: string, currentTask: string) => {
    setEditId(id);
    setEditTask(currentTask);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditTask('');
  };

  const saveEditing = async (id: string) => {
    try {
      await axios.patch(`${URL}/tasks/${id}`);
      setEditId(null);
      setEditTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className="todo-container"
      style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}
    >
      <h2>To-Do List</h2>
      <button
        onClick={logout}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '0.5rem 1rem',
          backgroundColor: '#d9534f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ width: '70%', padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          onClick={addTask}
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#5cb85c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '0.5rem' }}>
              Task
            </th>
            <th
              style={{
                borderBottom: '2px solid #ddd',
                padding: '0.5rem',
                width: '180px',
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {toDos.length === 0 ? (
            <tr>
              <td
                colSpan={2}
                style={{ padding: '1rem', textAlign: 'center', color: '#888' }}
              >
                No tasks available. Add a new task above.
              </td>
            </tr>
          ) : (
            toDos.map((item) => (
              <tr key={item._id}>
                <td style={{ padding: '0.5rem', verticalAlign: 'middle' }}>
                  {editId === item._id ? (
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.4rem',
                        fontSize: '1rem',
                      }}
                    />
                  ) : (
                    item.task
                  )}
                </td>
                <td style={{ padding: '0.5rem', verticalAlign: 'middle' }}>
                  {editId === item._id ? (
                    <>
                      <button
                        onClick={() => saveEditing(item._id)}
                        style={{
                          marginRight: '0.5rem',
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#5cb85c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#f0ad4e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(item._id, item.task)}
                        style={{
                          marginRight: '0.5rem',
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#0275d8',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(item._id)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: '#d9534f',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
