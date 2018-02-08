class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
  end
  
  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      @full_messages = @group.errors.full_messages
      render :new
    end
  end

  def update
    if @group.update(group_params)
      redirect_to root_path, notice: "編集内容を保存しました"
    else
      @full_messages = @group.errors.full_messages
      render :edit
    end
  end

  private

  def group_params
    params.require(:group).permit({:user_ids => []}, :name)
  end

  def set_group
    @group = Group.find(params[:id])
  end

end
