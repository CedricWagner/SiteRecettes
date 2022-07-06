{{-- ===== --}}
{{-- HOOKS --}}
{{-- ===== --}}

{{-- By order of appearence --}}
{{-- Do not delete, keep them empty if unused --}}


{{-- local tasks --}}
@task('hook_local_tasks_before', ['on' => 'localhost'])
    echo "=> Start local tasks..."
@endtask

@task('hook_local_tasks_after', ['on' => 'localhost'])
    echo "<= End local tasks..."
@endtask

{{-- init --}}
@task('hook_init', ['on' => 'web'])
    echo "=> Start deployment..."
    cd {{ absPath($config, 'app_path') }}
    {{-- set maintenance mode --}}
    vendor/bin/drupal site:maintenance on
    {{-- dump database --}}
    vendor/bin/drupal database:dump --file={{ $config['root_path'] }}/{{ $dump_name }}
@endtask

{{-- git --}}
@task('hook_git_before', ['on' => 'web'])
    echo "==> Start git"
@endtask

@task('hook_git_after', ['on' => 'web'])
    echo "<= End git"
@endtask

{{-- composer --}}
@task('hook_composer_before', ['on' => 'web'])
    echo "=> Start composer"
@endtask

@task('hook_composer_after', ['on' => 'web'])
    echo "<= End composer"
@endtask

{{-- npm --}}
@task('hook_npm_before', ['on' => 'web'])
    echo "=> Start NPM"
@endtask

@task('hook_npm_after', ['on' => 'web'])
    echo "<= End NPM"
@endtask

{{-- complete --}}
@task('hook_complete', ['on' => 'web'])
    cd {{ absPath($config, 'app_path') }}
    {{-- import config --}}
    drush config:import --source={{ absPath($config, 'app_path') }}/config/sync -y
    {{-- unset maintenance mode --}}
    vendor/bin/drupal site:maintenance off
    {{-- reload caches --}}
    vendor/bin/drupal cr
    echo "<== Deployment completed successfully :)"
@endtask

