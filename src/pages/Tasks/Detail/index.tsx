import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Badge, Button, Card } from 'react-bootstrap'
import moment from 'moment'
import api from '../../../services/api'

import '../styles.css'

interface ITask {
  id: number
  title: string
  description: string
  finished: boolean
  created_at: Date
  updated_at: Date
}

interface IParamsProps {
  id: string
}

const TaskDetail: React.FC = () => {
  const history = useHistory()
  const { id } = useParams<IParamsProps>()
  const [task, setTask] = useState<ITask>()

  useEffect(() => {
    findTask(id)
  }, [id])

  function back() {
    history.goBack()
  }

  async function findTask(id: string) {
    const response = await api.get<ITask>(`/tasks/${id}`)
    setTask(response.data)
  }

  function formatDate(date: Date | undefined) {
    return moment(date).format('DD/MM/YYYY')
  }

  return (
    <div className='container'>
      <br />
      <div className='task-header'>
        <h1>Detalhe da Tarefa</h1>
        <Button variant='dark' size='sm' onClick={back}>
          Voltar
        </Button>
      </div>
      <br />

      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>{task?.description}</Card.Text>
          <Card.Text>
            <Badge variant={task?.finished ? 'success' : 'warning'}>
              {task?.finished ? 'FINALIZADO' : 'PENDENTE'}
            </Badge>
          </Card.Text>
          <Card.Text>
            <strong>Data de Cadastro: </strong>
            <Badge variant='info'>{formatDate(task?.created_at)}</Badge>
          </Card.Text>
          <Card.Text>
            <strong>Data de Atualização: </strong>
            <Badge variant='info'>{formatDate(task?.updated_at)}</Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default TaskDetail
