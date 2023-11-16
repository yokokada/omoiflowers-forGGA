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
    try {
      const q = query(collection(db, "wishes"), where("tab", "==", activeTab), orderBy("order"));
      const querySnapshot = await getDocs(q);

      const loadedTodos = [];
      querySnapshot.forEach((doc) => {
        loadedTodos.push({ id: doc.id, ...doc.data() });
      });

      setTodos(loadedTodos);
    } catch (error) {
      console.error("Error loading todos from Firebase:", error);
    }
  };

//   ーーーーーーーーーーーリスト追加、更新、削除ーーーーーーーーーーーーーーーーーーーーーーー
  const addTodo = async (newTodo) => {
    await addTodoToFirebase(newTodo); // Firebaseへの追加を待つ
    // 状態を更新する前にFirebaseからデータを再読み込みすることもできます
    await loadTodosFromFirebase(); // または以下のコメントを解除してローカルに直接追加
    // setTodos([...todos, newTodo]);
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

    await Promise.all(updatePromises); // 更新が完了するのを待つ
    await loadTodosFromFirebase(); // ステートを更新するためにFirebaseから再読み込み
    // setTodos(newTodos); // この行は不要
  };
  // const deleteTodo = async (index) => {
  //   await deleteTodoFromFirebase(index);  // Firebaseから削除
  //   await loadTodosFromFirebase();  // 削除後、Firebaseからデータを再読み込み
  // };


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

  const endDrag = async (index) => {
    if (draggingIndex !== null) {
      // 新しい順序でリストを更新
      const newTodos = [...todos];
      const movedItem = newTodos.splice(draggingIndex, 1)[0];
      newTodos.splice(index, 0, movedItem);

      // Firebaseに新しい順序を反映
      await updateTodoInFirebase(movedItem, index);
      for (let i = 0; i < newTodos.length; i++) {
        if (i !== index) {
          await updateTodoInFirebase(newTodos[i], i);
        }
      }

      // ローカルステートを新しい順序で更新
      setTodos(newTodos);

      // ドラッグ処理終了
      setDraggingIndex(null);
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
