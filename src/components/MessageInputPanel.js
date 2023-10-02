import { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useForm, Controller } from 'react-hook-form'
import { useCreateMessage, useUpdateMessage } from './providers/AppProvider'

const Panel = styled.div`
  height: 60px;
  padding: 12px 24px;
`

const Form = styled.form`
  height: 100%;
  display: flex;
`

const MessageLabel = styled.label`
  flex: 1;
`

const MessageInput = styled.input`
  width: 100%;
  height: 100%;
`

const SendButton = styled.button`
  margin-left: 12px;
`

const MessageInputPanel = ({ roomId, editingMessage, onClearEditingMessage }) => {
  const isEditMode = !!editingMessage
  const { control, handleSubmit, resetField, setValue } = useForm({ defaultValues: { text: '' } })
  const createMessage = useCreateMessage(roomId)
  const updateMessage = useUpdateMessage(roomId)

  const onSubmit = useCallback(handleSubmit(({ text }) => {
    if (isEditMode) {
      updateMessage(editingMessage.id, text)
      onClearEditingMessage()
    } else {
      createMessage(text)
    }
    resetField('text')
  }), [createMessage, updateMessage, editingMessage, onClearEditingMessage])

  useEffect(() => {
    editingMessage ? setValue('text', editingMessage.text) : resetField('text')
  }, [editingMessage])

  return <Panel>
    <Form data-testid="message-form" onSubmit={onSubmit}>
      <Controller
        name="text"
        control={control}
        rules={{ required: true }}
        render={({ field, formState }) => {
          return <MessageLabel htmlFor={field.name}>
            <MessageInput {...field} required={!!formState.errors?.[field.name]} id={field.name} data-testid="message-input" />
          </MessageLabel>
        }}
      />
      <SendButton type="submit">{isEditMode ? 'Edit' : 'Send'}</SendButton>
    </Form>
  </Panel>
}

export default MessageInputPanel