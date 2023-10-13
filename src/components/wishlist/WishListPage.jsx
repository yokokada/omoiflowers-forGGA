import React, { useState, useRef , useEffect} from 'react';
import TodoItem from './ListItem';
import AddTodoModal from './AddListModal';
import { Plus } from 'iconoir-react';
import './WishList.css';
import EditTodoModal from './EditTodoModal';
import { useAdminFlag } from '../../context/AdminFlagContext'
import { doc, query, getDocs, orderBy, addDoc, collection, updateDoc , deleteDoc , where} from 'firebase/firestore'; 
import { db } from '../../pages/Firebase'; 

const TodoList = ({activeTab} ) => {
  const { adminFlag, isLoading,uid,displayName,tail } = useAdminFlag(); // <-- useAdminFlagで取得
  const [todos, setTodos] = useState([]); // ToDoアイテムの配列
  const [showModal, setShowModal] = useState(false); // モーダルの表示/非表示
  const [draggingIndex, setDraggingIndex] = useState(null); // ドラッグ中のアイテムのインデックス
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // 編集中のToDoのインデックス

// ーーーーーーーーーーーーーーーーーfirebase関連ーーーーーーーーーーーーーーーーーーーーーーーー
  useEffect(() => {
    // コンポーネントのマウント時に一度だけ呼び出す
    loadTodosFromFirebase();
  }, [activeTab]);

  const addTodoToFirebase = async (newTodo) => {
    await addDoc(collection(db, "wishes"), {
      ...newTodo,
      tab: activeTab,  // ここにアクティブなタブの情報を追加
      uid,
      order: todos.length,  // 順番も保存
      timestamp: new Date()
    });
  };

  const updateTodoInFirebase = async (updatedTodo, index) => {
    try {
    // console.log("Updating todo with index: ", index);
    // console.log("Updated Todo:", updatedTodo);

    const docRef = doc(db, "wishes", todos[index].id);
    await updateDoc(docRef, {
      ...updatedTodo,
      order: index // 順番も更新
    });
    // console.log(`Successfully updated todo with id ${todos[index].id} and new order ${index}`);
    } catch (e) {
    console.error("Error updating document: ", e);
  }
  };

  const deleteTodoFromFirebase = async (index) => {
    const docRef = doc(db, "wishes", todos[index].id);
    await deleteDoc(docRef);
  };

  const loadTodosFromFirebase = async () => {
    const q = query(collection(db, "wishes"),where("tab", "==", activeTab),orderBy("order")); // 順序に基づいてクエリを作成
    const querySnapshot = await getDocs(q);
    
    const loadedTodos = [];
    querySnapshot.forEach((doc) => {
      loadedTodos.push({
        id: doc.id,
        ...doc.data()
      });
    });
  
    setTodos(loadedTodos); // ステートを更新
  };

//   ーーーーーーーーーーーリスト追加、更新、削除ーーーーーーーーーーーーーーーーーーーーーーー
const addTodo = (newTodo) => {
    addTodoToFirebase(newTodo);  // Firebaseにも保存
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (index) => {
    await deleteTodoFromFirebase(index);  // awaitを追加
    const newTodos = todos.slice();
    newTodos.splice(index, 1);

    // Firebaseのデータも順序を更新
    const updatePromises = newTodos.map((todo, i) => {
        const docRef = doc(db, "wishes", todo.id);
        return updateDoc(docRef, { order: i });
    });

    await Promise.all(updatePromises); // すべての更新が完了するのを待つ

    await loadTodosFromFirebase(); // Firebaseからデータを再フェッチ

    setTodos(newTodos);
  };

  const updateTodo =async  (updatedTodo, index) => {
    // console.log("Updating todo with editingIndex: ", editingIndex);  // 追加
    await updateTodoInFirebase(updatedTodo, editingIndex);  // Firebaseも更新
    const newTodos = [...todos];
    newTodos[editingIndex] = updatedTodo;
    setTodos(newTodos);
  };


// ーーーーーーーーーーーーードラッグ&ドロップ関連ーーーーーーーーーーーーーーーーーーーーーーーー
  const startDrag = (index) => {
    // console.log(`startDrag called with index: ${index}`);
    setDraggingIndex(index);
  };

  const endDrag = async ( index) => {
    // console.log(`endDrag called with index: ${index}`);
    if (draggingIndex !== null) { // この条件を追加
        const newTodos = [...todos];
        const [movedItem] = newTodos.splice(draggingIndex, 1);
        newTodos.splice(index, 0, movedItem);
        // console.log("New todos order:", newTodos.map(t => t.text));  // この行を変更
        try {
     // Firebaseのデータを更新
        const updatePromises = newTodos.map((todo, i) =>  updateTodoInFirebase(todo, i)); 
      
      // すべての更新が完了するのを待つ
      await Promise.all(updatePromises);

      // 非同期処理が成功した後にステートを更新
      setTodos(newTodos);
      setDraggingIndex(null);  // ドラッグが終わったのでnullに設定
      }catch (e) {
        console.error("Error updating Firebase:", e);
      }
    }
  };

  const handleDrop = (e, index) => {
    // console.log(`handleDrop called with index: ${index}`);  // この行を追加
    e.preventDefault();
    endDrag(index);
  };

  // ドラッグを開始する関数
const handleDragStart = (e, index) => {
    // console.log("Drag started with index:", index);
    e.dataTransfer.setData("text/plain", index.toString()); // ドラッグデータを設定
    setDraggingIndex(index);
  };
  
// ーーーーーーーーーーーーーーーーモーダルの開閉関連ーーーーーーーーーーーーーーーーーーーーー
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    // console.log("closeModalが呼び出されました");
    setShowModal(false);

    // console.log("TodoList showModal:", showModal);

  };

  const openEditModal = (index) => {
    if (adminFlag === 0) {
    setEditingIndex(index);
    setShowEditModal(true);
    }   
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  
  return (
    <div>
    <div className='listContents'>
        <div>
        <ul>
            {todos.map((todo, index) => (
            <li 
                key={todo.id} 
                className={`listItem ${index === todos.length - 1 ? 'lastItem' : ''}`}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()} // ドラッグオーバーイベントをキャンセル
                onDrop={(e) => handleDrop(e, index)} // ドロップイベントを処理
            >
                <TodoItem 
                index={index} 
                todo={todo} 
                deleteTodo={deleteTodo}
                startDrag={startDrag}
                // endDrag={endDrag}
                isDragging={index === draggingIndex}
                openEditModal={openEditModal}  // これを追加
                 />
            </li>
            ))}
        </ul>
        </div>
        <div>
            {showModal && <AddTodoModal 
            showModal={showModal} 
            closeModal={closeModal} 
            addTodo={addTodo} />}
        </div>
        <div>
            {showEditModal && <EditTodoModal 
            showModal={showEditModal} 
            updateTodo={updateTodo}
            initialText={todos[editingIndex]?.text}
            closeModal={closeEditModal}  // この行を追加
        />}
        </div>
    </div>
    {adminFlag === 0 && <button className='addButton' onClick={openModal}>
        <div className='circle'><Plus style={{ color:'white'}}/></div>
    </button>}
    </div>
  );
};

export default TodoList;
