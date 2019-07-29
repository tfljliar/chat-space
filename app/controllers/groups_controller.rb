class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  def index
  end
  
  def new #新規グループ作成画面表示
    @group = Group.new
    @group.users << current_user
  end

  def create #作ったグループを保存（ビューはいらない）
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def group_params
    params.require(:group).permit(:name, { :user_ids => []})
  end

  def edit #グループ編集画面表示
  end

  def update #データ更新保存
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "グループを編集しました"
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => []})
  end

  def set_group
    @group = Group.find(params[:id])
  end
end