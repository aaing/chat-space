class MessagesController < ApplicationController
before_action :set_group

  def index
    @message = Message.new
    if params[:lastMessageId].present?
      @messages = @group.messages.where("id > ?", params[:lastMessageId]).includes(:user)
    else
      @messages = @group.messages.includes(:user)
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      flash.now[:notice] = 'メッセージが送信されました'
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group) }
        format.json
      end
    else
      flash.now[:alert] = 'メッセージを入力してください'
      @messages = @group.messages.includes(:user)
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
