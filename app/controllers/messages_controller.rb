class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
  end

  def create
    @group = Group.find(params[:group_id])
    @group.messages.create(message_params)
    redirect_to group_messages_path(@group)
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

end
