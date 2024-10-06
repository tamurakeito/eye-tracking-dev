## mainブランチに直接コミットする場合

git checkout main
git pull
echo '\x1b[36mコミットメッセージを入力しEnterキーを押してください\x1b[0m'
read -p '> ' line
git add .
git commit -m "yarn commit: ${line}"
git push origin main

## ブランチを切り分けるプロジェクトの場合

# # macOS以外で動作する場合は date の取得を適時OS環境に合わせて修正してください
# date=`date +"%Y%m%d%H%M%S"` # yyyymmddHHMMSSのフォーマットで日付時刻を出力（macOS12.5でのみ動作確認）
# branch="v${date}"
# # 以下gitの処理
# echo '\x1b[36mコミットメッセージを入力しEnterキーを押してください\x1b[0m'
# read -p '> ' line
# git branch -M "${branch}"
# git add .
# git commit -m "yarn commit: ${line}"
# git push -u origin "${branch}"
# git checkout main
# git pull
# git merge "${branch}"
# git push origin main
# git checkout -b "working-branch"

## PRを作成するプロジェクトの場合

# echo "\x1b[36m選択してください\x1b[0m"
# choices="1.現在のブランチにコミットする"
# choices+="\n"
# choices+="2.新しいブランチを作成する"
# echo $choices
# while read -n1 -p '> ' answer
# do
#   case $answer in
#     "1"|"")
#       branch=`git rev-parse --abbrev-ref HEAD`
#       echo '現在のブランチ"'$branch'"にコミットします'
#       echo '\x1b[36mコミットメッセージを入力しEnterキーを押してください\x1b[0m'
#       read -p '> ' commit
#       git add .
#       git commit -m "${commit}"
#       git push origin $branch
#       break
#       ;;
#     "2")
#       # macOS以外で動作する場合は date の取得を適時OS環境に合わせて修正してください
#       date=`date +"%Y%m%d%H%M%S"` # yyyymmddHHMMSSのフォーマットで日付時刻を出力（macOS12.5でのみ動作確認）
#       branch="v${date}"
#       echo '新しいブランチ\"${branch}\"を作成します'
#       echo '\x1b[36mコミットメッセージを入力しEnterキーを押してください\x1b[0m'
#       read -p '> ' commit
#       git branch -M "${branch}"
#       git add .
#       git commit -m "${commit}"
#       git push origin $branch
#       break
#       ;;
#     $'\x1b')
#       read -sn2 answer
#       echo '\n"1"または"2"を入力してください'
#       ;;
#     *)
#       echo '\n"1"または"2"を入力してください'
#       ;;
#   esac
# done
